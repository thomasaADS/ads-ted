// ==================== Analytics Tools ====================
import { z } from 'zod';
import { loadSessions } from '../browser.js';
import { SUPABASE_URL, SUPABASE_KEY } from '../config.js';

const log = (...args: unknown[]) => console.error('[analytics]', ...args);

// ---- Helper: Supabase query ----
async function querySupabase(table: string, params: Record<string, string> = {}): Promise<any> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];

  const url = new URL(`/rest/v1/${table}`, SUPABASE_URL);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const resp = await fetch(url.toString(), {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
  });

  return resp.ok ? resp.json() : [];
}

// ---- get_analytics ----
export const getAnalyticsSchema = z.object({
  period: z.string().optional().describe('Period: today, last_7d, last_30d, all_time').default('last_7d'),
});
export async function getAnalytics(params: z.infer<typeof getAnalyticsSchema>) {
  const sessions = loadSessions();

  // Get campaigns from Supabase
  const campaigns = await querySupabase('campaigns', { select: '*', order: 'created_at.desc', limit: '50' });

  return {
    period: params.period,
    total_campaigns: campaigns.length,
    platforms: {
      facebook: { connected: sessions.facebook?.logged_in || false },
      google: { connected: sessions.google?.logged_in || false },
    },
    campaigns_by_status: {
      active: campaigns.filter((c: any) => c.status === 'active').length,
      paused: campaigns.filter((c: any) => c.status === 'paused').length,
      draft: campaigns.filter((c: any) => !c.status || c.status === 'draft').length,
    },
    recent_campaigns: campaigns.slice(0, 5).map((c: any) => ({
      id: c.id,
      brand: c.brand_name,
      platforms: c.platforms,
      created: c.created_at,
    })),
  };
}

// ---- get_roi_report ----
export const getRoiReportSchema = z.object({
  campaign_id: z.string().optional().describe('Specific campaign ID, or omit for overview'),
});
export async function getRoiReport(params: z.infer<typeof getRoiReportSchema>) {
  let campaigns: any[];

  if (params.campaign_id) {
    campaigns = await querySupabase('campaigns', {
      id: `eq.${params.campaign_id}`,
      select: '*',
    });
  } else {
    campaigns = await querySupabase('campaigns', {
      select: '*',
      order: 'created_at.desc',
      limit: '20',
    });
  }

  return {
    report: campaigns.map((c: any) => ({
      id: c.id,
      brand: c.brand_name,
      budget: c.budget,
      platforms: c.platforms,
      objective: c.objective,
      created: c.created_at,
    })),
    total_budget: campaigns.reduce((sum: number, c: any) => sum + (c.budget || 0), 0),
    count: campaigns.length,
    note: 'For real-time ROI metrics, use fb_get_metrics or google_get_metrics on specific campaigns.',
  };
}
