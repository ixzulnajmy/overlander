import '../styles/globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import QueryProvider from '@/providers/QueryProvider'

export const metadata = {
  title: 'Overlander',
  description: 'Ride. Record. Relive.',
  manifest: '/manifest.json'
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
