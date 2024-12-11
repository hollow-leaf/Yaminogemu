import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { SolanaWalletProvider } from './SolanaWalletProvider'
import SelectBottom from '@/components/SelectBottom'


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
        className={`${PoetsenOne.variable} antialiased`}
        style={{
          backgroundImage: "linear-gradient(-225deg, #80DEEA 0%, #57E9F2 48%, #45D4FB 100%)"
/*           backgroundImage: 'linear-gradient(120deg, #EC692C 0%, #F4CF28 100%)'
 */        }}  
      >
        <SolanaWalletProvider>
          {children}
          <SelectBottom />
        </SolanaWalletProvider>
      </body>
    </html>
  )
}
