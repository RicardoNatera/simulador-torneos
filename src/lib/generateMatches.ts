import { Match } from '@/types/tournament'

export function generateFirstRoundMatches(teams: string[]): Match[] {
  const shuffled = [...teams].sort(() => Math.random() - 0.5)
  const matches: Match[] = []

  for (let i = 0; i < shuffled.length; i += 2) {
    matches.push({
      teamA: shuffled[i],
      teamB: shuffled[i + 1],
    })
  }

  return matches
}
