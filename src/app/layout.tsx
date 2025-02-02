import { Providers } from './providers'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Purchasing Power Calculator',
    description: 'Calculate purchasing power across different countries',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    )
}