'use client'
import { useState } from 'react'
import Button from './components/Button'
import './globals.css'
import { Nunito_Sans } from 'next/font/google'

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '600', '800']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body className={nunito.className} suppressHydrationWarning={true}>
        <header className="bg-primary dark:bg-secondary drop-shadow">
          <div className="container flex justify-between px-4 py-8">
            <h1 className='text-secondary-900 dark:text-primary-100 font-extrabold'>Where in the world?</h1>
            <Button className='text-sm text-secondary-900 font-semibold dark:text-primary' mode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </header>
        <main className="bg-primary-400 dark:bg-secondary-400">
          {children}
        </main>
      </body>
    </html>
  )
}
