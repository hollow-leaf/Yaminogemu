import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import DynamicConfig from '../config/dynamic.config'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Yaminogemu',
  description: 'A web3 game with staking tokens',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DynamicConfig>{children}</DynamicConfig>
      </body>
    </html>
  )
}
