const DEFAULT_NEXUS_LOGIN_URL = 'https://nexus.anclora.group/login';

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function normalizeLanguage(value: string | null | undefined): 'es' | 'en' | 'de' | 'fr' | null {
  const candidate = String(value || '').trim().toLowerCase();
  if (candidate === 'es' || candidate === 'en' || candidate === 'de' || candidate === 'fr') {
    return candidate;
  }
  return null;
}

function normalizeBaseUrl(value: string | undefined, fallback: string): string {
  const candidate = String(value || '').trim();
  if (!candidate) return fallback;
  return trimTrailingSlash(candidate);
}

function deriveBaseFromLogin(loginUrl: string): string {
  const url = new URL(loginUrl);
  url.pathname = url.pathname.replace(/\/login\/?$/, '') || '/';
  url.search = '';
  url.hash = '';
  return trimTrailingSlash(url.toString());
}

function withLanguage(url: string, language?: string | null): string {
  const normalized = normalizeLanguage(language);
  if (!normalized) return url;
  const nextUrl = new URL(url);
  nextUrl.searchParams.set('lang', normalized);
  return nextUrl.toString();
}

export function getNexusLoginUrl(language?: string | null): string {
  const loginUrl = normalizeBaseUrl(
    import.meta.env.VITE_ANCLORA_NEXUS_LOGIN_URL ?? import.meta.env.VITE_NEXUS_LOGIN_URL,
    DEFAULT_NEXUS_LOGIN_URL,
  );
  return withLanguage(loginUrl, language);
}

export function getPrivateAreaBaseUrl(language?: string | null): string {
  const loginUrl = getNexusLoginUrl(language);
  const fallbackBase = deriveBaseFromLogin(loginUrl);
  const baseUrl = normalizeBaseUrl(import.meta.env.VITE_ANCLORA_PRIVATE_AREA_URL, fallbackBase);
  return withLanguage(baseUrl, language);
}

export function getPartnerPortalUrl(language?: string | null): string {
  const fallback = `${normalizeBaseUrl(import.meta.env.VITE_ANCLORA_PRIVATE_AREA_URL, deriveBaseFromLogin(getNexusLoginUrl(language)))}/private-area/partner`;
  const url = normalizeBaseUrl(import.meta.env.VITE_ANCLORA_PARTNER_PORTAL_URL, fallback);
  return withLanguage(url, language);
}

export function getDataLabPortalUrl(language?: string | null): string {
  const fallback = `${normalizeBaseUrl(import.meta.env.VITE_ANCLORA_PRIVATE_AREA_URL, deriveBaseFromLogin(getNexusLoginUrl(language)))}/private-area/data-lab`;
  const url = normalizeBaseUrl(import.meta.env.VITE_ANCLORA_DATA_LAB_URL, fallback);
  return withLanguage(url, language);
}
