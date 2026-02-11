// ==================== ARIA MCP Server ====================
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

// Browser tools
import { browserNavigateSchema, browserNavigate, browserScreenshotSchema, browserScreenshot, browserClickSchema, browserClick, browserTypeSchema, browserType, browserStatusSchema, browserStatus } from './tools/browser.js';

// Facebook tools
import { fbLoginSchema, fbLogin, fbCheckLoginSchema, fbCheckLogin, fbListAdAccountsSchema, fbListAdAccounts, fbSetAdAccountSchema, fbSetAdAccount, fbCreateCampaignSchema, fbCreateCampaign, fbCreateAdSchema, fbCreateAd, fbPublishSchema, fbPublish, fbGetMetricsSchema, fbGetMetrics } from './tools/facebook.js';

// Google tools
import { googleLoginSchema, googleLogin, googleCheckLoginSchema, googleCheckLogin, googleCreateCampaignSchema, googleCreateCampaign, googleGetMetricsSchema, googleGetMetrics, googleListCampaignsSchema, googleListCampaigns } from './tools/google.js';

// Campaign tools
import { createCampaignSchema, createCampaign, listCampaignsSchema, listCampaigns, getCampaignSchema, getCampaign, updateCampaignSchema, updateCampaign, deleteCampaignSchema, deleteCampaign } from './tools/campaigns.js';

// AI Generation tools
import { generateVariantsSchema, generateVariants, generateImagesSchema, generateImages, parseBriefSchema, parseBrief } from './tools/generate.js';

// Landing Page tools
import { createLandingPageSchema, createLandingPage, publishLandingPageSchema, publishLandingPage } from './tools/landing-pages.js';

// Analytics tools
import { getAnalyticsSchema, getAnalytics, getRoiReportSchema, getRoiReport } from './tools/analytics.js';

const log = (...args: unknown[]) => console.error('[mcp]', ...args);

function jsonResult(data: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] };
}

function imageResult(data: Record<string, any>) {
  const result: any[] = [];

  // If there's a screenshot, include it as image
  if (data.screenshot_base64) {
    result.push({ type: 'image' as const, data: data.screenshot_base64, mimeType: 'image/jpeg' });
    // Also include text data without the base64
    const { screenshot_base64, ...rest } = data;
    if (Object.keys(rest).length > 0) {
      result.push({ type: 'text' as const, text: JSON.stringify(rest, null, 2) });
    }
  } else {
    result.push({ type: 'text' as const, text: JSON.stringify(data, null, 2) });
  }

  return { content: result };
}

export function createMcpServer(): McpServer {
  const server = new McpServer({
    name: 'aria-mcp',
    version: '1.0.0',
  });

  log('Registering ARIA MCP tools...');

  // ==================== BROWSER TOOLS ====================

  server.tool('browser_navigate', 'Navigate to a URL and take a screenshot', browserNavigateSchema.shape,
    async (params) => imageResult(await browserNavigate(params as any)));

  server.tool('browser_screenshot', 'Take a screenshot of the current page', browserScreenshotSchema.shape,
    async () => imageResult(await browserScreenshot()));

  server.tool('browser_click', 'Click an element on the page by CSS selector or text', browserClickSchema.shape,
    async (params) => jsonResult(await browserClick(params as any)));

  server.tool('browser_type', 'Type text into an input field', browserTypeSchema.shape,
    async (params) => jsonResult(await browserType(params as any)));

  server.tool('browser_status', 'Get current browser state and login status for all platforms', browserStatusSchema.shape,
    async () => jsonResult(await browserStatus()));

  // ==================== FACEBOOK TOOLS ====================

  server.tool('fb_login', 'Login to Facebook with email and password (saves session cookies)', fbLoginSchema.shape,
    async (params) => imageResult(await fbLogin(params as any)));

  server.tool('fb_check_login', 'Check if logged in to Facebook', fbCheckLoginSchema.shape,
    async () => jsonResult(await fbCheckLogin()));

  server.tool('fb_list_ad_accounts', 'List all Facebook ad accounts', fbListAdAccountsSchema.shape,
    async () => jsonResult(await fbListAdAccounts()));

  server.tool('fb_set_ad_account', 'Select which Facebook ad account to use', fbSetAdAccountSchema.shape,
    async (params) => jsonResult(await fbSetAdAccount(params as any)));

  server.tool('fb_create_campaign', 'Create a new Facebook ad campaign (starts paused)', fbCreateCampaignSchema.shape,
    async (params) => jsonResult(await fbCreateCampaign(params as any)));

  server.tool('fb_create_ad', 'Create a Facebook ad with targeting, image, and copy', fbCreateAdSchema.shape,
    async (params) => jsonResult(await fbCreateAd(params as any)));

  server.tool('fb_publish', 'Activate/publish a paused Facebook campaign', fbPublishSchema.shape,
    async (params) => jsonResult(await fbPublish(params as any)));

  server.tool('fb_get_metrics', 'Get performance metrics for a Facebook campaign', fbGetMetricsSchema.shape,
    async (params) => jsonResult(await fbGetMetrics(params as any)));

  // ==================== GOOGLE ADS TOOLS ====================

  server.tool('google_login', 'Login to Google Ads via browser', googleLoginSchema.shape,
    async (params) => imageResult(await googleLogin(params as any)));

  server.tool('google_check_login', 'Check if logged in to Google Ads', googleCheckLoginSchema.shape,
    async () => jsonResult(await googleCheckLogin()));

  server.tool('google_create_campaign', 'Create a new Google Ads campaign', googleCreateCampaignSchema.shape,
    async (params) => imageResult(await googleCreateCampaign(params as any)));

  server.tool('google_get_metrics', 'Get Google Ads performance metrics', googleGetMetricsSchema.shape,
    async (params) => imageResult(await googleGetMetrics(params as any)));

  server.tool('google_list_campaigns', 'List all Google Ads campaigns', googleListCampaignsSchema.shape,
    async () => imageResult(await googleListCampaigns()));

  // ==================== CAMPAIGN MANAGEMENT ====================

  server.tool('create_campaign', 'Create a new campaign brief in the database', createCampaignSchema.shape,
    async (params) => jsonResult(await createCampaign(params as any)));

  server.tool('list_campaigns', 'List all campaigns', listCampaignsSchema.shape,
    async (params) => jsonResult(await listCampaigns(params as any)));

  server.tool('get_campaign', 'Get full details of a campaign', getCampaignSchema.shape,
    async (params) => jsonResult(await getCampaign(params as any)));

  server.tool('update_campaign', 'Update campaign fields', updateCampaignSchema.shape,
    async (params) => jsonResult(await updateCampaign(params as any)));

  server.tool('delete_campaign', 'Delete a campaign', deleteCampaignSchema.shape,
    async (params) => jsonResult(await deleteCampaign(params as any)));

  // ==================== AI GENERATION ====================

  server.tool('generate_variants', 'Generate ad copy variants using Gemini AI for multiple platforms', generateVariantsSchema.shape,
    async (params) => jsonResult(await generateVariants(params as any)));

  server.tool('generate_images', 'Generate campaign images with AI', generateImagesSchema.shape,
    async (params) => jsonResult(await generateImages(params as any)));

  server.tool('parse_brief', 'Parse free-text into a structured campaign brief using AI', parseBriefSchema.shape,
    async (params) => jsonResult(await parseBrief(params as any)));

  // ==================== LANDING PAGES ====================

  server.tool('create_landing_page', 'Generate a complete landing page with AI', createLandingPageSchema.shape,
    async (params) => jsonResult(await createLandingPage(params as any)));

  server.tool('publish_landing_page', 'Publish/deploy a landing page', publishLandingPageSchema.shape,
    async (params) => jsonResult(await publishLandingPage(params as any)));

  // ==================== ANALYTICS ====================

  server.tool('get_analytics', 'Get campaign analytics overview', getAnalyticsSchema.shape,
    async (params) => jsonResult(await getAnalytics(params as any)));

  server.tool('get_roi_report', 'Get ROI report for campaigns', getRoiReportSchema.shape,
    async (params) => jsonResult(await getRoiReport(params as any)));

  log(`Registered 27 tools successfully`);
  return server;
}
