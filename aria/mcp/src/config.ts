// ==================== ARIA MCP Configuration ====================

export type Platform = 'meta' | 'google' | 'tiktok' | 'linkedin' | 'twitter' | 'taboola' | 'outbrain' | 'sms' | 'email';

export interface AdVariant {
  platform: Platform;
  primary_text: string;
  headline: string;
  description: string;
  cta: string;
  final_url?: string;
  image_urls?: { square?: string; portrait?: string; landscape?: string };
  audience?: { geo?: string; age_range?: string; interests?: string[] };
}

export interface CampaignBrief {
  brand_name: string;
  website?: string;
  industry: string;
  city?: string;
  offer: string;
  budget?: number;
  tone: string;
  objective: string;
  languages: string[];
  platforms: Platform[];
}

export interface SessionState {
  facebook: { logged_in: boolean; email?: string; token?: string; ad_account_id?: string };
  google: { logged_in: boolean; email?: string };
  browser: { running: boolean; current_url?: string; page_title?: string };
}

export const DASHBOARD_PORT = 3888;
export const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
export const SUPABASE_KEY = process.env.SUPABASE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '';
export const FB_APP_ID = process.env.FB_APP_ID || process.env.VITE_FACEBOOK_APP_ID || '';
export const FB_APP_SECRET = process.env.FB_APP_SECRET || process.env.VITE_FACEBOOK_APP_SECRET || '';
