import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import DynamicConfig from '../config/dynamic.config'
import ClientSideSelectBottom from './clientsideSelectBottom'

const PoetsenOne = localFont({
  src: './fonts/Poetsen_One/PoetsenOne-Regular.ttf',
  variable: '--font-geist-sans',
  weight: '100 400'
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
        className={`${PoetsenOne.variable} antialiased bg-custom-gradient`}
      >
        <DynamicConfig>
          {children}
          <ClientSideSelectBottom />
        </DynamicConfig>
      </body>
    </html>
  )
}
