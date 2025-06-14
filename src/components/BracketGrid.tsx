'use client'

import { Round } from '@/types/tournament'

type Props = { rounds: Round[] }

export default function BracketGrid({ rounds }: Props) {
  const cols = `grid-cols-${rounds.length}` as const

  return (
    <div className="overflow-x-auto pb-4">
      <div
        className={`grid ${cols} gap-x-8 relative`}
        style={{ minWidth: `${rounds.length * 180}px` }}
      >
        {rounds.map((round, colIdx) => (
          <div key={colIdx} className="space-y-6">
            <h3 className="text-center font-semibold text-gray-200">{round.name}</h3>

            {round.matches.map((match, rowIdx) => (
              <div
                key={rowIdx}
                className="relative flex flex-col items-center"
                style={{ minHeight: 64 * 2 ** colIdx }}
              >
                {/* Tarjeta del partido en modo oscuro */}
                <div className="w-44 bg-gray-700 rounded-xl p-2 text-center shadow border border-gray-600">
                  <div
                    className={`font-medium ${
                      match.winner === match.teamA ? 'text-green-400' : 'text-gray-100'
                    }`}
                  >
                    {match.teamA}
                  </div>-
                  <div
                    className={`font-medium ${
                      match.winner === match.teamB ? 'text-green-400' : 'text-gray-100'
                    }`}
                  >
                    {match.teamB}
                  </div>
                </div>

                {/* Conectores */}
                {colIdx < rounds.length - 1 && (
                  <>
                    <span className="absolute right-[-40px] top-1/2 w-10 h-px bg-gray-500" />
                    <span
                      className="absolute right-[-40px] bg-gray-500"
                      style={{
                        width: '1px',
                        height: `${64 * 2 ** colIdx}px`,
                        top: rowIdx % 2 === 0 ? '50%' : '-50%',
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
