'use client'

import { useState } from 'react'
import TeamInputList from '@/components/TeamInputList'
import { generateFirstRoundMatches } from '@/lib/generateMatches'
import { Round, Tournament } from '@/types/tournament'
import BracketGrid from '@/components/BracketGrid'

export default function Home() {
  const [teamCount, setTeamCount] = useState<number>(4)
  const [teamNames, setTeamNames] = useState<string[]>(Array(4).fill(''))
  const [tournament, setTournament] = useState<Tournament>([])
  const [champion, setChampion] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState<boolean>(false)

  const handleTeamCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value)
    setTeamCount(count)
    setTeamNames(Array(count).fill(''))
    setTournament([])
    setChampion(null)
    setShowPreview(false)
  }

  const handleReset = () => {
    setTeamCount(4)
    setTeamNames(Array(4).fill(''))
    setTournament([])
    setChampion(null)
    setShowPreview(false)
  }

  const handleTeamNameChange = (index: number, name: string) => {
    const updated = [...teamNames]
    updated[index] = name
    setTeamNames(updated)

    const filled = updated.filter((n) => n.trim() !== '')
    setShowPreview(filled.length === teamCount)
  }

  const handleStart = () => {
    const filled = teamNames.filter((name) => name.trim() !== '')
    if (filled.length !== teamCount) {
      alert('Por favor completa todos los nombres de equipos.')
      return
    }

    const firstMatches = generateFirstRoundMatches(filled)
    const firstRound: Round = {
      name: 'Primera ronda',
      matches: firstMatches,
    }

    setTournament([firstRound])
    setChampion(null)
    setShowPreview(false)
  }

  const handleSelectWinner = (roundIndex: number, matchIndex: number, selected: string) => {
    const updatedTournament = [...tournament]
    const updatedMatch = {
      ...updatedTournament[roundIndex].matches[matchIndex],
      winner: selected,
    }
    updatedTournament[roundIndex].matches[matchIndex] = updatedMatch
    setTournament(updatedTournament)
  }

  const handleNextRound = () => {
    const lastRound = tournament[tournament.length - 1]
    const winners = lastRound.matches.map((m) => m.winner!).filter(Boolean)

    if (winners.length === 1) {
      setChampion(winners[0])
      return
    }
    const nextMatches = generateFirstRoundMatches(winners)
    const nextRound: Round = {
      name: `Ronda ${tournament.length + 1}`,
      matches: nextMatches,
    }

    setTournament([...tournament, nextRound])
  }

  return (
    <main className="min-h-screen bg-gray-900 p-6 space-y-10 text-gray-100">
      <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-white">
          Simulador de Torneos
        </h1>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Cantidad de equipos:</label>
          <select
            className="w-full p-2 border border-gray-500 rounded text-gray-900 bg-white"
            value={teamCount}
            onChange={handleTeamCountChange}
          >
            {[4, 8, 16, 32].map((n) => (
              <option key={n} value={n}>
                {n} equipos
              </option>
            ))}
          </select>
        </div>

        <TeamInputList
          count={teamCount}
          names={teamNames}
          onNameChange={handleTeamNameChange}
        />

        <button
          onClick={handleStart}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Comenzar torneo
        </button>

        <button
          onClick={handleReset}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Reiniciar torneo
        </button>

        {tournament.map((round, roundIndex) => (
          <div key={roundIndex} className="mt-6 space-y-3">
            <h2 className="text-lg font-semibold text-center text-white">{round.name}</h2>

            {round.matches.map((match, matchIndex) => (
              <div key={matchIndex} className="flex items-center justify-center gap-2 bg-gray-700 p-2 rounded">
                <button
                  onClick={() => handleSelectWinner(roundIndex, matchIndex, match.teamA)}
                  className={`px-3 py-1 rounded font-semibold border-2 ${
                    match.winner === match.teamA
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-800 text-white border-gray-500 hover:bg-gray-700'
                  }`}
                >
                  {match.teamA}
                </button>

                <span className="font-medium text-gray-300">vs</span>

                <button
                  onClick={() => handleSelectWinner(roundIndex, matchIndex, match.teamB)}
                  className={`px-3 py-1 rounded font-semibold border-2 ${
                    match.winner === match.teamB
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-800 text-white border-gray-500 hover:bg-gray-700'
                  }`}
                >
                  {match.teamB}
                </button>
              </div>
            ))}

            {round.matches.every((m) => m.winner) && roundIndex === tournament.length - 1 && (
              <button
                onClick={handleNextRound}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 block mx-auto mt-2"
              >
                Continuar a la siguiente ronda
              </button>
            )}
          </div>
        ))}

        {champion && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-green-400">🏆 {champion} es el campeón 🏆</h2>
          </div>
        )}
      </div>

      {/* Mostrar preview automático si todos los nombres están completos y torneo no ha iniciado */}
      {showPreview && tournament.length === 0 && (
        <div className="bg-gray-800 rounded-2xl shadow-xl p-6 max-w-4xl mx-auto text-gray-100">
          <h2 className="text-center text-lg font-semibold mb-4">Emparejamientos Iniciales</h2>
          <BracketGrid rounds={[{ name: 'Primera ronda', matches: generateFirstRoundMatches(teamNames) }]} />
        </div>
      )}
    </main>
  )
}
