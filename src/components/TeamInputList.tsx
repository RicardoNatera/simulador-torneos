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
          className="w-full p-2 border rounded text-gray-900 text-sm sm:text-base"
        />
      ))}
    </div>
  )
}
