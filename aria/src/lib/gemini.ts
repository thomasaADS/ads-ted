// Gemini AI Integration (Free API from Google)
// Get your API key from: https://makersuite.google.com/app/apikey

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function callGemini(messages: ChatMessage[]): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file');
  }

  // Convert our message format to Gemini format
  const geminiMessages: GeminiMessage[] = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to call Gemini API');
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'לא הצלחתי לקבל תשובה';
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

// Generate campaign content using Gemini
export async function generateCampaignWithAI(briefData: {
  brandName: string;
  industry: string;
  city: string;
  offer: string;
  tone: string;
  platforms: string[];
  objective: string;
  language: string;
}): Promise<any> {
  const systemPrompt = `אתה מומחה בשיווק דיגיטלי וכתיבה קריאטיבית לפרסומות.
תפקידך ליצור ${briefData.platforms.length} וריאציות מודעות מקצועיות וקריאטיביות עבור כל פלטפורמה.

פרטי הקמפיין:
- שם המותג: ${briefData.brandName}
- תחום עיסוק: ${briefData.industry}
- מיקום: ${briefData.city}
- מבצע/הצעה: ${briefData.offer}
- טון: ${briefData.tone}
- מטרה: ${briefData.objective}
- פלטפורמות: ${briefData.platforms.join(', ')}
- שפה: ${briefData.language === 'he' ? 'עברית' : 'אנגלית'}

צור 2-3 וריאציות למודעה עבור כל פלטפורמה.

עבור כל וריאציה, החזר JSON במבנה הבא:
{
  "variants": [
    {
      "platform": "meta",
      "primary_text": "טקסט ראשי מעניין ומשכנע (עד 150 מילים למטא)",
      "headline": "כותרת קצרה ומושכת (עד 7 מילים)",
      "description": "תיאור קצר (עד 15 מילים)",
      "cta": "LEARN_MORE או BOOK_NOW או SHOP_NOW",
      "audience_suggestion": "המלצה לקהל יעד (גיל, תחומי עניין)"
    }
  ]
}

חשוב:
- כתוב טקסט קריאטיבי ומקצועי
- התאם את הטון לפי הבקשה (${briefData.tone})
- שלב אמוג'י רק למטא/אינסטגרם
- גוגל - קצר ותמציתי, ממוקד מילות מפתח
- טאבולה/אאוטבריין - סגנון עיתונאי מעניין
- כל וריאציה חייבת להיות שונה ויצירתית

החזר רק JSON תקין, ללא טקסט נוסף.`;

  try {
    const response = await callGemini([
      { role: 'user', content: systemPrompt }
    ]);

    // Try to parse JSON from the response
    // Sometimes Gemini adds markdown code blocks
    let jsonText = response;
    const jsonMatch = response.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    const result = JSON.parse(jsonText);
    return result;
  } catch (error) {
    console.error('Error generating campaign with AI:', error);
    throw error;
  }
}




