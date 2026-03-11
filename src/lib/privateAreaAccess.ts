const DEFAULT_NEXUS_LOGIN_URL = 'https://nexus.anclora.group/login';

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function normalizeBaseUrl(value: string | undefined, fallback: string): string {
  const candidate = String(value || '').trim();
  if (!candidate) return fallback;
  return trimTrailingSlash(candidate);
}

function deriveBaseFromLogin(loginUrl: string): string {
  return loginUrl.replace(/\/login\/?$/, '');
}

export function getNexusLoginUrl(): string {
  return normalizeBaseUrl(
    import.meta.env.VITE_ANCLORA_NEXUS_LOGIN_URL ?? import.meta.env.VITE_NEXUS_LOGIN_URL,
    DEFAULT_NEXUS_LOGIN_URL,
  );
}

export function getPrivateAreaBaseUrl(): string {
  const loginUrl = getNexusLoginUrl();
  const fallbackBase = deriveBaseFromLogin(loginUrl);
  return normalizeBaseUrl(import.meta.env.VITE_ANCLORA_PRIVATE_AREA_URL, fallbackBase);
}

export function getPartnerPortalUrl(): string {
  const fallback = `${getPrivateAreaBaseUrl()}/private-area/partner`;
  return normalizeBaseUrl(import.meta.env.VITE_ANCLORA_PARTNER_PORTAL_URL, fallback);
}

export function getDataLabPortalUrl(): string {
  const fallback = `${getPrivateAreaBaseUrl()}/private-area/data-lab`;
  return normalizeBaseUrl(import.meta.env.VITE_ANCLORA_DATA_LAB_URL, fallback);
}
