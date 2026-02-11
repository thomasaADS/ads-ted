// ==================== Facebook/Meta Ads Tools ====================
import { z } from 'zod';
import { ensurePage, saveCookies, updateSession, loadSessions, navigate, screenshot, waitForSelector } from '../browser.js';
import { FB_APP_ID, FB_APP_SECRET } from '../config.js';

const FB_API = 'https://graph.facebook.com/v18.0';
const log = (...args: unknown[]) => console.error('[facebook]', ...args);

// ---- Helper: API request ----
async function fbApiRequest(endpoint: string, method = 'GET', data?: Record<string, any>): Promise<any> {
  const sessions = loadSessions();
  const token = sessions.facebook?.token;
  if (!token) throw new Error('Not logged in to Facebook. Use fb_login first.');

  const url = `${FB_API}${endpoint}`;
  const params = new URLSearchParams({ access_token: token, ...data });

  const resp = method === 'GET'
    ? await fetch(`${url}?${params}`)
    : await fetch(`${url}?access_token=${token}`, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
      });

  const json = await resp.json();
  if (!resp.ok) throw new Error(json.error?.message || 'Facebook API error');
  return json;
}

// ---- fb_login ----
export const fbLoginSchema = z.object({
  email: z.string().describe('Facebook email or phone'),
  password: z.string().describe('Facebook password'),
});
export async function fbLogin(params: z.infer<typeof fbLoginSchema>) {
  const page = await ensurePage();
  log('Navigating to Facebook login...');

  await page.goto('https://www.facebook.com/login', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Fill login form
  await page.fill('#email', params.email);
  await page.fill('#pass', params.password);
  await page.click('button[name="login"]');
  await page.waitForTimeout(5000);

  // Check if login succeeded
  const currentUrl = page.url();
  if (currentUrl.includes('login') || currentUrl.includes('checkpoint')) {
    const img = await screenshot();
    return {
      success: false,
      message: 'Login may require 2FA or failed. Check the screenshot.',
      url: currentUrl,
      screenshot_base64: img,
    };
  }

  // Try to get access token via Graph API
  // Navigate to Graph API Explorer to get a token
  log('Login successful, extracting token...');
  await saveCookies();

  // Navigate to business tools to get token
  await page.goto(`https://www.facebook.com/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=https://www.facebook.com/connect/login_success.html&scope=ads_management,ads_read,business_management&response_type=token`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Check if we got a token in the URL
  const tokenUrl = page.url();
  const tokenMatch = tokenUrl.match(/access_token=([^&]+)/);

  if (tokenMatch) {
    const token = decodeURIComponent(tokenMatch[1]);
    updateSession('facebook', { logged_in: true, email: params.email, token });
    await saveCookies();
    return { success: true, message: 'Logged in to Facebook successfully!', email: params.email, has_token: true };
  }

  // If no auto-token, save login state anyway
  updateSession('facebook', { logged_in: true, email: params.email });
  await saveCookies();

  const img = await screenshot();
  return {
    success: true,
    message: 'Logged in to Facebook. May need to authorize app for ads access.',
    email: params.email,
    has_token: false,
    screenshot_base64: img,
  };
}

// ---- fb_check_login ----
export const fbCheckLoginSchema = z.object({});
export async function fbCheckLogin() {
  const sessions = loadSessions();
  const fb = sessions.facebook || { logged_in: false };
  return { ...fb, has_token: !!fb.token };
}

// ---- fb_list_ad_accounts ----
export const fbListAdAccountsSchema = z.object({});
export async function fbListAdAccounts() {
  const data = await fbApiRequest('/me/adaccounts', 'GET', {
    fields: 'id,account_id,name,currency,timezone_name,account_status',
  });
  return { accounts: data.data || [], count: data.data?.length || 0 };
}

// ---- fb_set_ad_account ----
export const fbSetAdAccountSchema = z.object({
  account_id: z.string().describe('Ad account ID (e.g., act_123456)'),
});
export async function fbSetAdAccount(params: z.infer<typeof fbSetAdAccountSchema>) {
  updateSession('facebook', { ad_account_id: params.account_id });
  return { success: true, ad_account_id: params.account_id };
}

// ---- fb_create_campaign ----
export const fbCreateCampaignSchema = z.object({
  name: z.string().describe('Campaign name'),
  objective: z.string().optional().describe('Campaign objective: OUTCOME_TRAFFIC, OUTCOME_ENGAGEMENT, OUTCOME_LEADS, OUTCOME_SALES').default('OUTCOME_TRAFFIC'),
});
export async function fbCreateCampaign(params: z.infer<typeof fbCreateCampaignSchema>) {
  const sessions = loadSessions();
  const accountId = sessions.facebook?.ad_account_id;
  if (!accountId) throw new Error('No ad account selected. Use fb_set_ad_account first.');

  const result = await fbApiRequest(`/${accountId}/campaigns`, 'POST', {
    name: params.name,
    objective: params.objective,
    status: 'PAUSED',
    special_ad_categories: [],
  });
  return { campaign_id: result.id, name: params.name, status: 'PAUSED' };
}

// ---- fb_create_ad ----
export const fbCreateAdSchema = z.object({
  campaign_id: z.string().describe('Facebook campaign ID'),
  headline: z.string().describe('Ad headline'),
  body: z.string().describe('Ad body text'),
  image_url: z.string().optional().describe('Image URL for the ad'),
  target_url: z.string().describe('Landing page URL'),
  daily_budget: z.number().describe('Daily budget in USD'),
  age_min: z.number().optional().default(18),
  age_max: z.number().optional().default(65),
  geo: z.string().optional().describe('Target country code (e.g., IL)').default('IL'),
});
export async function fbCreateAd(params: z.infer<typeof fbCreateAdSchema>) {
  const sessions = loadSessions();
  const accountId = sessions.facebook?.ad_account_id;
  if (!accountId) throw new Error('No ad account selected.');

  // Create Ad Set
  const adSet = await fbApiRequest(`/${accountId}/adsets`, 'POST', {
    name: `${params.headline} - Ad Set`,
    campaign_id: params.campaign_id,
    daily_budget: params.daily_budget * 100,
    billing_event: 'IMPRESSIONS',
    optimization_goal: 'LINK_CLICKS',
    targeting: {
      geo_locations: { countries: [params.geo] },
      age_min: params.age_min,
      age_max: params.age_max,
    },
    status: 'PAUSED',
  });

  // Upload image if provided
  let imageHash: string | undefined;
  if (params.image_url) {
    try {
      const imgResp = await fetch(params.image_url);
      const buffer = Buffer.from(await imgResp.arrayBuffer());
      const base64 = buffer.toString('base64');
      const imgResult = await fbApiRequest(`/${accountId}/adimages`, 'POST', { bytes: base64 });
      imageHash = imgResult.images[Object.keys(imgResult.images)[0]]?.hash;
    } catch (err) {
      log('Image upload failed, continuing without image:', err);
    }
  }

  // Create Ad
  const creative: any = {
    name: `${params.headline} - Creative`,
    object_story_spec: {
      link_data: {
        link: params.target_url,
        message: params.body,
        name: params.headline,
        call_to_action: { type: 'LEARN_MORE', value: { link: params.target_url } },
      },
    },
  };
  if (imageHash) creative.object_story_spec.link_data.image_hash = imageHash;

  const ad = await fbApiRequest(`/${accountId}/ads`, 'POST', {
    name: params.headline,
    adset_id: adSet.id,
    creative,
    status: 'PAUSED',
  });

  return { ad_id: ad.id, adset_id: adSet.id, campaign_id: params.campaign_id, status: 'PAUSED' };
}

// ---- fb_publish ----
export const fbPublishSchema = z.object({
  campaign_id: z.string().describe('Campaign ID to activate'),
});
export async function fbPublish(params: z.infer<typeof fbPublishSchema>) {
  await fbApiRequest(`/${params.campaign_id}`, 'POST', { status: 'ACTIVE' });
  return { success: true, campaign_id: params.campaign_id, status: 'ACTIVE' };
}

// ---- fb_get_metrics ----
export const fbGetMetricsSchema = z.object({
  campaign_id: z.string().describe('Campaign ID to get metrics for'),
});
export async function fbGetMetrics(params: z.infer<typeof fbGetMetricsSchema>) {
  try {
    const data = await fbApiRequest(`/${params.campaign_id}/insights`, 'GET', {
      fields: 'impressions,clicks,spend,cpc,ctr,reach,frequency,actions',
      date_preset: 'last_7d',
    });
    return { campaign_id: params.campaign_id, insights: data.data || [], period: 'last_7d' };
  } catch (err: any) {
    return { campaign_id: params.campaign_id, error: err.message, insights: [] };
  }
}
