// UTM parameter builder utility

interface UTMParams {
  source: string;
  medium: string;
  campaign: string;
  content?: string;
  term?: string;
}

export function buildUTMUrl(baseUrl: string, params: UTMParams): string {
  try {
    const url = new URL(baseUrl);
    
    if (params.source) url.searchParams.set('utm_source', params.source);
    if (params.medium) url.searchParams.set('utm_medium', params.medium);
    if (params.campaign) url.searchParams.set('utm_campaign', params.campaign);
    if (params.content) url.searchParams.set('utm_content', params.content);
    if (params.term) url.searchParams.set('utm_term', params.term);
    
    return url.toString();
  } catch (error) {
    console.error('Invalid URL for UTM building:', baseUrl);
    return baseUrl;
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateCampaignSlug(
  brandName: string,
  city: string,
  industry: string,
  offer?: string
): string {
  const parts = [brandName, city, industry, offer].filter(Boolean);
  return slugify(parts.join('-')).substring(0, 50);
}
