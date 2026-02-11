// ==================== Campaign Management Tools (Supabase) ====================
import { z } from 'zod';
import { SUPABASE_URL, SUPABASE_KEY } from '../config.js';

const log = (...args: unknown[]) => console.error('[campaigns]', ...args);

// Simple Supabase REST client (no SDK needed for basic CRUD)
async function supabaseRequest(table: string, method = 'GET', params?: Record<string, any>, body?: any): Promise<any> {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Supabase not configured. Set SUPABASE_URL and SUPABASE_KEY in .env');
  }

  const url = new URL(`/rest/v1/${table}`, SUPABASE_URL);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const resp = await fetch(url.toString(), {
    method,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': method === 'POST' ? 'return=representation' : 'return=minimal',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Supabase error: ${resp.status} - ${err}`);
  }

  const text = await resp.text();
  return text ? JSON.parse(text) : {};
}

// ---- create_campaign ----
export const createCampaignSchema = z.object({
  brand_name: z.string().describe('Brand/business name'),
  industry: z.string().describe('Business industry'),
  offer: z.string().describe('What is being promoted'),
  tone: z.string().optional().default('professional'),
  objective: z.string().optional().default('TRAFFIC'),
  platforms: z.array(z.string()).optional().default(['meta']),
  budget: z.number().optional().describe('Monthly budget in USD'),
  website: z.string().optional().describe('Website URL'),
  city: z.string().optional(),
});
export async function createCampaign(params: z.infer<typeof createCampaignSchema>) {
  const data = await supabaseRequest('campaigns', 'POST', undefined, {
    brand_name: params.brand_name,
    industry: params.industry,
    offer: params.offer,
    tone: params.tone,
    objective: params.objective,
    platforms: params.platforms,
    budget: params.budget,
    website: params.website,
    city: params.city,
  });
  return { campaign: data[0] || data, message: 'Campaign created successfully' };
}

// ---- list_campaigns ----
export const listCampaignsSchema = z.object({
  limit: z.number().optional().default(20),
  status: z.string().optional().describe('Filter by status'),
});
export async function listCampaigns(params: z.infer<typeof listCampaignsSchema>) {
  const queryParams: Record<string, string> = {
    select: '*',
    order: 'created_at.desc',
    limit: String(params.limit),
  };
  if (params.status) queryParams['status'] = `eq.${params.status}`;

  const data = await supabaseRequest('campaigns', 'GET', queryParams);
  return { campaigns: data, count: data.length };
}

// ---- get_campaign ----
export const getCampaignSchema = z.object({
  id: z.string().describe('Campaign UUID'),
});
export async function getCampaign(params: z.infer<typeof getCampaignSchema>) {
  const data = await supabaseRequest('campaigns', 'GET', {
    id: `eq.${params.id}`,
    select: '*',
  });
  if (!data.length) throw new Error(`Campaign not found: ${params.id}`);
  return { campaign: data[0] };
}

// ---- update_campaign ----
export const updateCampaignSchema = z.object({
  id: z.string().describe('Campaign UUID'),
  updates: z.record(z.any()).describe('Fields to update (e.g., { "status": "active", "budget": 500 })'),
});
export async function updateCampaign(params: z.infer<typeof updateCampaignSchema>) {
  await supabaseRequest('campaigns', 'PATCH', { id: `eq.${params.id}` }, params.updates);
  return { success: true, id: params.id, updated_fields: Object.keys(params.updates) };
}

// ---- delete_campaign ----
export const deleteCampaignSchema = z.object({
  id: z.string().describe('Campaign UUID to delete'),
});
export async function deleteCampaign(params: z.infer<typeof deleteCampaignSchema>) {
  await supabaseRequest('campaigns', 'DELETE', { id: `eq.${params.id}` });
  return { success: true, id: params.id, message: 'Campaign deleted' };
}
