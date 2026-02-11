// ==================== Browser Automation Tools ====================
import { z } from 'zod';
import { navigate, screenshot, clickElement, typeText, getPageInfo, loadSessions } from '../browser.js';

// ---- browser_navigate ----
export const browserNavigateSchema = z.object({
  url: z.string().describe('URL to navigate to'),
});
export async function browserNavigate(params: z.infer<typeof browserNavigateSchema>) {
  const result = await navigate(params.url);
  const img = await screenshot();
  return { ...result, screenshot_base64: img };
}

// ---- browser_screenshot ----
export const browserScreenshotSchema = z.object({});
export async function browserScreenshot() {
  const info = await getPageInfo();
  const img = await screenshot();
  return { ...info, screenshot_base64: img };
}

// ---- browser_click ----
export const browserClickSchema = z.object({
  selector: z.string().describe('CSS selector or text content to click'),
});
export async function browserClick(params: z.infer<typeof browserClickSchema>) {
  const result = await clickElement(params.selector);
  if (result.success) {
    const info = await getPageInfo();
    return { ...result, ...info };
  }
  return result;
}

// ---- browser_type ----
export const browserTypeSchema = z.object({
  selector: z.string().describe('CSS selector of input field'),
  text: z.string().describe('Text to type'),
});
export async function browserType(params: z.infer<typeof browserTypeSchema>) {
  return typeText(params.selector, params.text);
}

// ---- browser_status ----
export const browserStatusSchema = z.object({});
export async function browserStatus() {
  const info = await getPageInfo();
  const sessions = loadSessions();
  return {
    browser: { running: true, ...info },
    facebook: sessions.facebook || { logged_in: false },
    google: sessions.google || { logged_in: false },
  };
}
