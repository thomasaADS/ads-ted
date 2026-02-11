// ==================== Playwright Browser Manager ====================
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STORE_DIR = join(__dirname, '..', 'store');
const COOKIES_FILE = join(STORE_DIR, 'browser-cookies.json');
const SESSIONS_FILE = join(STORE_DIR, 'sessions.json');

const log = (...args: unknown[]) => console.error('[browser]', ...args);

let browser: Browser | null = null;
let context: BrowserContext | null = null;
let page: Page | null = null;

// ==================== Initialize ====================

export async function initBrowser(): Promise<void> {
  if (!existsSync(STORE_DIR)) mkdirSync(STORE_DIR, { recursive: true });

  log('Launching Chromium browser...');
  browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'],
  });

  // Load saved cookies if they exist
  const storageState = existsSync(COOKIES_FILE) ? COOKIES_FILE : undefined;

  context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'he-IL',
    storageState,
  });

  page = await context.newPage();
  log('Browser ready');
}

// ==================== Getters ====================

export function getBrowser(): Browser | null { return browser; }
export function getContext(): BrowserContext | null { return context; }

export function getPage(): Page | null { return page; }

export async function ensurePage(): Promise<Page> {
  if (!page || page.isClosed()) {
    if (!context) throw new Error('Browser not initialized');
    page = await context.newPage();
  }
  return page;
}

// ==================== Cookie Persistence ====================

export async function saveCookies(): Promise<void> {
  if (!context) return;
  try {
    const state = await context.storageState();
    writeFileSync(COOKIES_FILE, JSON.stringify(state, null, 2));
    log('Cookies saved');
  } catch (err) {
    log('Failed to save cookies:', err);
  }
}

export async function clearCookies(): Promise<void> {
  if (!context) return;
  await context.clearCookies();
  if (existsSync(COOKIES_FILE)) {
    writeFileSync(COOKIES_FILE, JSON.stringify({ cookies: [], origins: [] }));
  }
  log('Cookies cleared');
}

// ==================== Session State ====================

interface SessionData {
  facebook?: { logged_in: boolean; email?: string; token?: string; ad_account_id?: string };
  google?: { logged_in: boolean; email?: string };
}

export function loadSessions(): SessionData {
  if (!existsSync(SESSIONS_FILE)) return {};
  try {
    return JSON.parse(readFileSync(SESSIONS_FILE, 'utf-8'));
  } catch { return {}; }
}

export function saveSessions(data: SessionData): void {
  writeFileSync(SESSIONS_FILE, JSON.stringify(data, null, 2));
}

export function updateSession(platform: 'facebook' | 'google', data: Record<string, unknown>): void {
  const sessions = loadSessions();
  sessions[platform] = { ...sessions[platform], ...data } as any;
  saveSessions(sessions);
}

// ==================== Navigation & Interaction ====================

export async function navigate(url: string): Promise<{ title: string; url: string }> {
  const p = await ensurePage();
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await p.waitForTimeout(1000);
  return { title: await p.title(), url: p.url() };
}

export async function screenshot(): Promise<string> {
  const p = await ensurePage();
  const buffer = await p.screenshot({ type: 'jpeg', quality: 70 });
  return buffer.toString('base64');
}

export async function clickElement(selector: string): Promise<{ success: boolean; message: string }> {
  const p = await ensurePage();
  try {
    // Try CSS selector first
    const el = await p.$(selector);
    if (el) {
      await el.click();
      await p.waitForTimeout(500);
      return { success: true, message: `Clicked: ${selector}` };
    }
    // Try text content
    const textEl = await p.$(`text="${selector}"`);
    if (textEl) {
      await textEl.click();
      await p.waitForTimeout(500);
      return { success: true, message: `Clicked text: ${selector}` };
    }
    return { success: false, message: `Element not found: ${selector}` };
  } catch (err: any) {
    return { success: false, message: `Click failed: ${err.message}` };
  }
}

export async function typeText(selector: string, text: string): Promise<{ success: boolean; message: string }> {
  const p = await ensurePage();
  try {
    await p.fill(selector, text);
    return { success: true, message: `Typed into: ${selector}` };
  } catch (err: any) {
    try {
      // Fallback: click and type
      await p.click(selector);
      await p.keyboard.type(text, { delay: 50 });
      return { success: true, message: `Typed (keyboard) into: ${selector}` };
    } catch (e: any) {
      return { success: false, message: `Type failed: ${e.message}` };
    }
  }
}

export async function waitForSelector(selector: string, timeout = 10000): Promise<boolean> {
  const p = await ensurePage();
  try {
    await p.waitForSelector(selector, { timeout });
    return true;
  } catch { return false; }
}

export async function getPageInfo(): Promise<{ url: string; title: string }> {
  const p = await ensurePage();
  return { url: p.url(), title: await p.title() };
}

// ==================== Cleanup ====================

export async function closeBrowser(): Promise<void> {
  await saveCookies();
  if (browser) await browser.close();
  browser = null;
  context = null;
  page = null;
  log('Browser closed');
}
