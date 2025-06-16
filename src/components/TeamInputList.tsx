type Props = {
  count: number
  names: string[]
  onNameChange: (index: number, name: string) => void
}

export default function TeamInputList({ count, names, onNameChange }: Props) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Equipo ${i + 1}`}
          value={names[i]}
          onChange={(e) => onNameChange(i, e.target.value)}
          className="w-full p-2 rounded text-sm sm:text-base border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  )
}
