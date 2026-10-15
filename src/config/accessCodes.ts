export type AccessDestination = 'team' | 'league' | 'experimental' | 'swaps' | 'personal'

const ACCESS_CODES: Record<string, AccessDestination> = {
  'MM-TEAM': 'team',
  'MM-LEADERS': 'league',
  'MM-RESEARCH': 'experimental',
  'MM-SWAPS': 'swaps',
  'MATEEN': 'personal',
}

export function resolveAccessCode(code: string): AccessDestination | null {
  return ACCESS_CODES[code.trim().toUpperCase()] ?? null
}
