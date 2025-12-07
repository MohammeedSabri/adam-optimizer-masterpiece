import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Layout/Navigation'
import SimpleBackground from '@/components/Visualizations/SimpleBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Adam Optimizer - Masterpiece',
  description: 'Interactive presentation about Adam Optimizer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <SimpleBackground />
        <Navigation />
        <main className="relative z-10 ml-0 lg:ml-80">
          {children}
        </main>
      </body>
    </html>
  )
}