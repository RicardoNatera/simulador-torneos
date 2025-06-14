export type Match = {
  teamA: string
  teamB: string
  scoreA?: number
  scoreB?: number
  winner?: string
}

export type Round = {
  name: string
  matches: Match[]
}

export type Tournament = Round[]
