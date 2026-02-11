// ==================== ARIA MCP Server - Entry Point ====================
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { initBrowser, closeBrowser } from './browser.js';
import { createMcpServer } from './mcp-server.js';
import { startDashboardServer } from './dashboard-server.js';
import { DASHBOARD_PORT } from './config.js';

const log = (...args: unknown[]) => console.error('[aria]', ...args);

async function main() {
  log('🚀 Starting ARIA MCP Server...');
  log('   AI Campaign Manager with Browser Automation');
  log('');

  // Step 1: Initialize Playwright browser
  try {
    await initBrowser();
    log('✅ Browser ready (Playwright Chromium)');
  } catch (err) {
    log('⚠️  Browser init failed:', err);
    log('   Install browsers: npx playwright install chromium');
    // Continue anyway — browser-dependent tools will report errors
  }

  // Step 2: Start dashboard web server
  startDashboardServer(DASHBOARD_PORT);
  log(`✅ Dashboard: http://localhost:${DASHBOARD_PORT}`);

  // Step 3: Start MCP server over stdio
  const server = createMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  log('✅ MCP server running on stdio');
  log('');
  log('📋 27 tools available:');
  log('   Browser: navigate, screenshot, click, type, status');
  log('   Facebook: login, check_login, list_ad_accounts, set_ad_account, create_campaign, create_ad, publish, get_metrics');
  log('   Google: login, check_login, create_campaign, get_metrics, list_campaigns');
  log('   Campaigns: create, list, get, update, delete');
  log('   AI: generate_variants, generate_images, parse_brief');
  log('   Landing Pages: create, publish');
  log('   Analytics: get_analytics, get_roi_report');

  // Cleanup on exit
  process.on('SIGINT', async () => { await closeBrowser(); process.exit(0); });
  process.on('SIGTERM', async () => { await closeBrowser(); process.exit(0); });
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
