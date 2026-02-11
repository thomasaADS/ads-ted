// ==================== Google Ads Tools ====================
import { z } from 'zod';
import { ensurePage, saveCookies, updateSession, loadSessions, screenshot, waitForSelector } from '../browser.js';

const log = (...args: unknown[]) => console.error('[google]', ...args);

// ---- google_login ----
export const googleLoginSchema = z.object({
  email: z.string().describe('Google account email'),
  password: z.string().describe('Google account password'),
});
export async function googleLogin(params: z.infer<typeof googleLoginSchema>) {
  const page = await ensurePage();
  log('Navigating to Google Ads login...');

  await page.goto('https://ads.google.com', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Check if already logged in
  if (page.url().includes('ads.google.com/aw')) {
    updateSession('google', { logged_in: true, email: params.email });
    await saveCookies();
    return { success: true, message: 'Already logged in to Google Ads', email: params.email };
  }

  // Google login flow
  await page.goto('https://accounts.google.com/signin/v2', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Enter email
  try {
    await page.fill('input[type="email"]', params.email);
    await page.click('#identifierNext, button:has-text("Next"), button:has-text("הבא")');
    await page.waitForTimeout(3000);
  } catch (err) {
    const img = await screenshot();
    return { success: false, message: 'Failed to enter email', screenshot_base64: img };
  }

  // Enter password
  try {
    await page.fill('input[type="password"]', params.password);
    await page.click('#passwordNext, button:has-text("Next"), button:has-text("הבא")');
    await page.waitForTimeout(5000);
  } catch (err) {
    const img = await screenshot();
    return { success: false, message: 'Failed to enter password. May need 2FA.', screenshot_base64: img };
  }

  // Check result
  const url = page.url();
  if (url.includes('challenge') || url.includes('signin')) {
    const img = await screenshot();
    return {
      success: false,
      message: 'Google requires additional verification (2FA). Check screenshot.',
      url,
      screenshot_base64: img,
    };
  }

  // Navigate to Google Ads
  await page.goto('https://ads.google.com', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  updateSession('google', { logged_in: true, email: params.email });
  await saveCookies();

  const img = await screenshot();
  return { success: true, message: 'Logged in to Google Ads', email: params.email, screenshot_base64: img };
}

// ---- google_check_login ----
export const googleCheckLoginSchema = z.object({});
export async function googleCheckLogin() {
  const sessions = loadSessions();
  return sessions.google || { logged_in: false };
}

// ---- google_create_campaign ----
export const googleCreateCampaignSchema = z.object({
  campaign_name: z.string().describe('Campaign name'),
  campaign_type: z.string().optional().describe('Campaign type: search, display, shopping, video').default('search'),
  daily_budget: z.number().describe('Daily budget in USD'),
  keywords: z.array(z.string()).optional().describe('Target keywords for search campaigns'),
  headlines: z.array(z.string()).optional().describe('Ad headlines (up to 15)'),
  descriptions: z.array(z.string()).optional().describe('Ad descriptions (up to 4)'),
  target_url: z.string().describe('Landing page URL'),
  geo: z.string().optional().describe('Target country').default('Israel'),
});
export async function googleCreateCampaign(params: z.infer<typeof googleCreateCampaignSchema>) {
  const sessions = loadSessions();
  if (!sessions.google?.logged_in) {
    throw new Error('Not logged in to Google Ads. Use google_login first.');
  }

  const page = await ensurePage();

  // Navigate to campaign creation
  await page.goto('https://ads.google.com/aw/campaigns/new', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const img = await screenshot();

  // Return info about the campaign setup - actual automation would require
  // navigating through Google Ads' multi-step wizard
  return {
    message: 'Google Ads campaign creation page loaded. The campaign wizard is complex and multi-step.',
    campaign_name: params.campaign_name,
    campaign_type: params.campaign_type,
    daily_budget: params.daily_budget,
    target_url: params.target_url,
    status: 'wizard_loaded',
    screenshot_base64: img,
    note: 'Use browser_click and browser_type tools to navigate through the wizard steps.',
  };
}

// ---- google_get_metrics ----
export const googleGetMetricsSchema = z.object({
  date_range: z.string().optional().describe('Date range: today, yesterday, last_7d, last_30d').default('last_7d'),
});
export async function googleGetMetrics(params: z.infer<typeof googleGetMetricsSchema>) {
  const sessions = loadSessions();
  if (!sessions.google?.logged_in) {
    throw new Error('Not logged in to Google Ads. Use google_login first.');
  }

  const page = await ensurePage();
  await page.goto('https://ads.google.com/aw/campaigns', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const img = await screenshot();

  return {
    message: 'Google Ads campaigns dashboard loaded.',
    date_range: params.date_range,
    screenshot_base64: img,
    note: 'View the screenshot for campaign performance data.',
  };
}

// ---- google_list_campaigns ----
export const googleListCampaignsSchema = z.object({});
export async function googleListCampaigns() {
  const sessions = loadSessions();
  if (!sessions.google?.logged_in) {
    throw new Error('Not logged in to Google Ads. Use google_login first.');
  }

  const page = await ensurePage();
  await page.goto('https://ads.google.com/aw/campaigns', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Try to extract campaign data from the page
  const campaigns = await page.evaluate(() => {
    const rows = document.querySelectorAll('table tbody tr');
    return Array.from(rows).slice(0, 20).map(row => {
      const cells = row.querySelectorAll('td');
      return Array.from(cells).map(c => c.textContent?.trim() || '');
    });
  });

  const img = await screenshot();

  return {
    campaigns_data: campaigns,
    count: campaigns.length,
    screenshot_base64: img,
  };
}
