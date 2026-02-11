// ==================== AI Generation Tools ====================
import { z } from 'zod';
import { GEMINI_API_KEY, type CampaignBrief, type AdVariant } from '../config.js';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const log = (...args: unknown[]) => console.error('[generate]', ...args);

// ---- Helper: Call Gemini ----
async function callGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not configured. Set it in your .env file.');

  const resp = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.9, topK: 1, topP: 1, maxOutputTokens: 4096 },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    }),
  });

  if (!resp.ok) {
    const err = await resp.json();
    throw new Error(err.error?.message || 'Gemini API error');
  }

  const data = await resp.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

function parseJsonResponse(text: string): any {
  let json = text;
  const match = text.match(/```json\n?([\s\S]*?)\n?```/);
  if (match) json = match[1];
  return JSON.parse(json);
}

// ---- generate_variants ----
export const generateVariantsSchema = z.object({
  brand_name: z.string().describe('Brand/business name'),
  industry: z.string().describe('Business industry'),
  offer: z.string().describe('What you are offering/promoting'),
  tone: z.string().optional().describe('Tone: professional, casual, funny, urgent').default('professional'),
  platforms: z.array(z.string()).optional().describe('Target platforms: meta, google, tiktok, linkedin, twitter').default(['meta']),
  language: z.string().optional().describe('Language: he, en').default('he'),
  city: z.string().optional().describe('Target city/location'),
  objective: z.string().optional().describe('Campaign goal: traffic, conversions, leads, brand_awareness').default('traffic'),
});
export async function generateVariants(params: z.infer<typeof generateVariantsSchema>) {
  log('Generating variants with Gemini AI...');

  const prompt = `אתה מומחה בשיווק דיגיטלי וכתיבה קריאטיבית לפרסומות.
צור 2-3 וריאציות מודעות מקצועיות עבור כל פלטפורמה.

פרטי הקמפיין:
- שם המותג: ${params.brand_name}
- תחום: ${params.industry}
${params.city ? `- מיקום: ${params.city}` : ''}
- מבצע/הצעה: ${params.offer}
- טון: ${params.tone}
- מטרה: ${params.objective}
- פלטפורמות: ${params.platforms.join(', ')}
- שפה: ${params.language === 'he' ? 'עברית' : 'English'}

עבור כל וריאציה החזר JSON:
{
  "variants": [
    {
      "platform": "meta",
      "primary_text": "טקסט ראשי (עד 150 מילים)",
      "headline": "כותרת (עד 7 מילים)",
      "description": "תיאור (עד 15 מילים)",
      "cta": "LEARN_MORE / BOOK_NOW / SHOP_NOW",
      "audience_suggestion": "המלצה לקהל יעד"
    }
  ]
}

החזר רק JSON תקין.`;

  const response = await callGemini(prompt);
  const result = parseJsonResponse(response);

  return {
    brand_name: params.brand_name,
    platforms: params.platforms,
    variants: result.variants || [],
    count: result.variants?.length || 0,
  };
}

// ---- generate_images ----
export const generateImagesSchema = z.object({
  prompt: z.string().describe('Image description/prompt'),
  style: z.string().optional().describe('Style: photo, illustration, 3d, minimal').default('photo'),
  count: z.number().optional().describe('Number of images to generate').default(1),
});
export async function generateImages(params: z.infer<typeof generateImagesSchema>) {
  // Use Pollinations AI for free image generation
  const images = [];
  for (let i = 0; i < params.count; i++) {
    const seed = Math.floor(Math.random() * 10000);
    const encodedPrompt = encodeURIComponent(`${params.prompt}, ${params.style} style, high quality, professional advertising`);
    images.push({
      url: `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=628&seed=${seed}`,
      prompt: params.prompt,
      style: params.style,
      dimensions: '1200x628',
    });
  }
  return { images, count: images.length };
}

// ---- parse_brief ----
export const parseBriefSchema = z.object({
  text: z.string().describe('Free-text campaign brief from the user'),
});
export async function parseBrief(params: z.infer<typeof parseBriefSchema>) {
  log('Parsing brief with Gemini AI...');

  const prompt = `אתה עוזר AI שממיר טקסט חופשי לבריף קמפיין מובנה.

הטקסט מהמשתמש:
"${params.text}"

החזר JSON מובנה:
{
  "brand_name": "שם המותג/עסק",
  "industry": "תחום עיסוק",
  "city": "עיר/מיקום או null",
  "offer": "מה המבצע/הצעה",
  "tone": "professional/casual/funny/urgent",
  "objective": "traffic/conversions/leads/brand_awareness",
  "platforms": ["meta", "google"],
  "budget": null,
  "language": "he"
}

החזר רק JSON תקין.`;

  const response = await callGemini(prompt);
  const result = parseJsonResponse(response);
  return { brief: result, raw_text: params.text };
}
