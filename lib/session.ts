import { cookies } from "next/headers";

export interface SessionData {
  userId?: number;
  username?: string;
  isLoggedIn: boolean;
}

const SESSION_COOKIE = "portfolio_admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "fallback-secret-key";

function base64url(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function createSessionToken(data: Omit<SessionData, "isLoggedIn"> & { isLoggedIn: true }): string {
  const payload = JSON.stringify({ ...data, exp: Date.now() + 24 * 60 * 60 * 1000 });
  const encoded = base64url(payload);
  const sig = base64url(SESSION_SECRET + encoded);
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token: string): SessionData | null {
  try {
    const [encoded, sig] = token.split(".");
    const expectedSig = base64url(SESSION_SECRET + encoded);
    if (sig !== expectedSig) return null;
    const payload = JSON.parse(Buffer.from(encoded, "base64").toString("utf-8"));
    if (payload.exp < Date.now()) return null;
    return { ...payload, isLoggedIn: true };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return { isLoggedIn: false };
  const data = verifySessionToken(token);
  return data || { isLoggedIn: false };
}

export async function createSession(username: string): Promise<string> {
  const token = createSessionToken({ userId: 1, username, isLoggedIn: true });
  return token;
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;

