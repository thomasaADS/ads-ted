// ==================== Landing Page Tools ====================
import { z } from 'zod';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { GEMINI_API_KEY } from '../config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = join(__dirname, '..', '..', 'store', 'landing-pages');

const log = (...args: unknown[]) => console.error('[landing-pages]', ...args);

// ---- Helper: Call Gemini ----
async function callGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not configured.');

  const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
    }),
  });

  const data = await resp.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// ---- create_landing_page ----
export const createLandingPageSchema = z.object({
  brand_name: z.string().describe('Brand/business name'),
  headline: z.string().describe('Main headline'),
  description: z.string().describe('Page description/offer'),
  cta_text: z.string().optional().describe('Call to action button text').default('צרו קשר'),
  cta_url: z.string().optional().describe('CTA button URL'),
  phone: z.string().optional().describe('Business phone number'),
  color: z.string().optional().describe('Primary color hex').default('#6366f1'),
  language: z.string().optional().describe('Language: he, en').default('he'),
});
export async function createLandingPage(params: z.infer<typeof createLandingPageSchema>) {
  log('Generating landing page with AI...');

  const prompt = `צור דף נחיתה HTML מלא ומקצועי עבור:
- שם העסק: ${params.brand_name}
- כותרת: ${params.headline}
- תיאור: ${params.description}
- כפתור CTA: ${params.cta_text}
- צבע ראשי: ${params.color}
- שפה: ${params.language === 'he' ? 'עברית (RTL)' : 'English (LTR)'}
${params.phone ? `- טלפון: ${params.phone}` : ''}

הדרישות:
- HTML + CSS מובנים (inline styles)
- עיצוב מודרני, רספונסיבי
- אנימציות CSS
- Hero section עם כותרת וCTA
- סקשן יתרונות (3-4 יתרונות)
- סקשן CTA סופי
- פוטר

החזר רק את קוד ה-HTML המלא, ללא הסברים.`;

  const html = await callGemini(prompt);

  // Clean up markdown if present
  let cleanHtml = html;
  const match = html.match(/```html\n?([\s\S]*?)\n?```/);
  if (match) cleanHtml = match[1];

  // Save to file
  if (!existsSync(PAGES_DIR)) mkdirSync(PAGES_DIR, { recursive: true });
  const filename = `${params.brand_name.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.html`;
  const filepath = join(PAGES_DIR, filename);
  writeFileSync(filepath, cleanHtml, 'utf-8');

  return {
    success: true,
    filename,
    filepath,
    brand_name: params.brand_name,
    headline: params.headline,
    html_length: cleanHtml.length,
    message: `Landing page created: ${filename}`,
  };
}

// ---- publish_landing_page ----
export const publishLandingPageSchema = z.object({
  filename: z.string().describe('Landing page filename to publish'),
  destination: z.string().optional().describe('Where to publish: local (default), or a URL').default('local'),
});
export async function publishLandingPage(params: z.infer<typeof publishLandingPageSchema>) {
  const filepath = join(PAGES_DIR, params.filename);

  if (!existsSync(filepath)) {
    throw new Error(`Landing page not found: ${params.filename}`);
  }

  // For now, just serve locally
  return {
    success: true,
    filename: params.filename,
    filepath,
    message: `Landing page ready at: ${filepath}`,
    note: 'To serve: run a static file server pointing to the landing-pages directory.',
  };
}
