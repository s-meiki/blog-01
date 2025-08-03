'use client'

import { useTheme } from 'next-themes'

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800"
    >
      {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  )
}
