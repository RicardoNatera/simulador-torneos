import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Simulador de Torneos",
  description: "Simula torneos eliminatorios interactivos con resultados aleatorios",
  metadataBase: new URL("https://simulador-torneos.vercel.app"),//cambiar al hacer deploy
  openGraph: {
    title: "Simulador de Torneos",
    description: "Genera emparejamientos y simula torneos deportivos en segundos",
    url: "https://simulador-torneos.vercel.app", //cambiar al hacer deploy
    siteName: "Simulador de Torneos",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulador de Torneos",
    description: "Simula torneos eliminatorios de forma sencilla e interactiva",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Pre-hydration theme fix to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100`}
      >
        {children}
      </body>
    </html>
  )
}
