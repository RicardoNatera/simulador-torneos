'use client'

import { useState } from 'react'
import TeamInputList from '@/components/TeamInputList'
import { generateFirstRoundMatches } from '@/lib/generateMatches'
import { Round, Tournament } from '@/types/tournament'
import Header from '@/components/Header'

export default function Home() {
  const [teamCount, setTeamCount] = useState<number>(4)
  const [teamNames, setTeamNames] = useState<string[]>(Array(4).fill(''))
  const [tournament, setTournament] = useState<Tournament>([])
  const [champion, setChampion] = useState<string | null>(null)
  const [tournamentName, setTournamentName] = useState<string>('')

  const handleTeamCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value)
    setTeamCount(count)
    setTeamNames(Array(count).fill(''))
    setTournament([])
    setChampion(null)
  }

  const handleReset = () => {
    setTeamCount(4)
    setTeamNames(Array(4).fill(''))
    setTournament([])
    setChampion(null)
    setTournamentName('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTeamNameChange = (index: number, name: string) => {
    const updated = [...teamNames]
    updated[index] = name
    setTeamNames(updated)
  }

  const handleStart = () => {
    const filled = teamNames.filter((name) => name.trim() !== '')
    if (filled.length !== teamCount) {
      alert('Por favor completa todos los nombres de equipos.')
      return
    }
    if (!tournamentName.trim()) {
      alert('Por favor ingresa el nombre del torneo.')
      return
    }
    const firstMatches = generateFirstRoundMatches(filled)
    const firstRound: Round = {
      name: 'Primera ronda',
      matches: firstMatches,
    }

    setTournament([firstRound])
    setChampion(null)
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
    <main className="min-h-screen bg-white dark:bg-gray-900 p-6 space-y-10 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header/> 
      <div className="w-full max-w-md mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white">
          Simulador de Torneos
        </h1>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del torneo:</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-400 rounded text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600"
            value={tournamentName}
            onChange={(e) => setTournamentName(e.target.value)}
            placeholder="Ej: Copa Verano 2025"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cantidad de equipos:</label>
          <select
            className="w-full p-2 border border-gray-400 rounded text-gray-900 dark:text-white bg-white dark:bg-gray-700 dark:border-gray-600"
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

        {tournament.length > 0 && !champion && (
          <div className="text-center mt-4">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
              Torneo: “{tournamentName}”
            </h2>
          </div>
        )}

        {tournament.map((round, roundIndex) => (
          <div key={roundIndex} className="mt-6 space-y-3">
            <h2 className="text-lg font-semibold text-center text-gray-900 dark:text-white">{round.name}</h2>

            {round.matches.map((match, matchIndex) => (
              <div
                key={matchIndex}
                className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 p-2 rounded"
              >
                <button
                  onClick={() => handleSelectWinner(roundIndex, matchIndex, match.teamA)}
                  disabled={roundIndex < tournament.length - 1 || champion !== null}
                  className={`px-3 py-1 rounded font-semibold border-2 transition ${
                    match.winner === match.teamA
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {match.teamA}
                </button>

                <span className="font-medium text-gray-600 dark:text-gray-300">vs</span>

                <button
                  onClick={() => handleSelectWinner(roundIndex, matchIndex, match.teamB)}
                  disabled={roundIndex < tournament.length - 1 || champion !== null}
                  className={`px-3 py-1 rounded font-semibold border-2 transition ${
                    match.winner === match.teamB
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600'
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
                {round.matches.length === 1 ? 'Declarar al campeón' : 'Continuar a la siguiente ronda'}
              </button>
            )}
          </div>
        ))}

        {champion && (
          <div className="mt-6 text-center space-y-4 animate-pulse">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-green-600 dark:text-green-400">
              🏆 {champion} 🏆
            </h2>
            <p className="text-lg sm:text-xl text-gray-900 dark:text-white font-semibold">
              ¡Es el gran campeón del torneo <span className="text-blue-600 dark:text-blue-400">“{tournamentName}”</span>!
            </p>

            <button
              onClick={handleReset}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mt-2"
            >
              Reiniciar torneo
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
