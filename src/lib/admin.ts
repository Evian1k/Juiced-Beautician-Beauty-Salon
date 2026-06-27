import { cookies } from 'next/headers'

export const ADMIN_COOKIE_NAME = 'jb_admin_session'
// Default PIN — overridden by env var in production
export const ADMIN_PIN = process.env.ADMIN_PIN || 'juiced2026'
const SECRET = process.env.ADMIN_COOKIE_SECRET || 'juiced-beautician-secret-2026-CHANGE-THIS'

// Simple session token = base64(pin) + '.' + base64(secret-first-12-chars)
// Not cryptographically strong — sufficient for a single-admin salon dashboard
// protected behind a 5-tap hidden entry point. Upgrade to NextAuth if multi-user.
function encode(s: string) {
  return Buffer.from(s, 'utf-8').toString('base64url')
}

export function makeSessionToken(): string {
  return `${encode(ADMIN_PIN)}.${encode(SECRET.slice(0, 12))}`
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  try {
    const pin = Buffer.from(parts[0], 'base64url').toString('utf-8')
    const secret = Buffer.from(parts[1], 'base64url').toString('utf-8')
    return pin === ADMIN_PIN && secret === SECRET.slice(0, 12)
  } catch {
    return false
  }
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(ADMIN_COOKIE_NAME)?.value
  return isValidSessionToken(token)
}

export function verifyPin(pin: string): boolean {
  // Constant-time-ish comparison
  if (pin.length !== ADMIN_PIN.length) return false
  let diff = 0
  for (let i = 0; i < pin.length; i++) {
    diff |= pin.charCodeAt(i) ^ ADMIN_PIN.charCodeAt(i)
  }
  return diff === 0
}
