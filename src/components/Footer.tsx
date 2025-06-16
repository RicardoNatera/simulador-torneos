export default function Footer() {
  return (
    <footer className="w-full text-center text-sm text-gray-600 dark:text-gray-400 mt-12 pb-6 px-4">
      <p>
        Hecho con <span className="text-red-500">❤️</span> por{' '}
        <a
          href="https://www.linkedin.com/in/natera-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline hover:opacity-80"
        >
          Ricardo Natera
        </a>
      </p>
      <p className="mt-1">
        Código fuente en{' '}
        <a
          href="https://github.com/RicardoNatera/simulador-torneos"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 underline hover:opacity-80"
        >
          GitHub
        </a>
      </p>
    </footer>
  )
}
