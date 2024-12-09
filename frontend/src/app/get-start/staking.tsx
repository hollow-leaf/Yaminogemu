'use client'
import { formatAddress } from '@/utils/strignfy'
import { useRouter } from 'next/navigation'
import { useUserWallets } from '@dynamic-labs/sdk-react-core'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { SolanaWallet } from '@dynamic-labs/solana-core'
import { SolanaTransactionService } from '@/hooks/solanahook'
import Swal from 'sweetalert2'

export default function Staking() {
  const userWallets = useUserWallets()
  const { primaryWallet } = useDynamicContext()
  const [balance, setBalance] = useState<string | undefined | null>(null)
  const [chain, setChain] = useState<string | undefined | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [amount, setAmount] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<string>('Bonk')

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    setChain(userWallets[0]?.chain)
  }, [userWallets])

  useEffect(() => {
    const fetchBalance = async () => {
      if (primaryWallet) {
        const value = await primaryWallet.getBalance()
        setBalance(value as string | undefined)
      }
    }
    fetchBalance()
  }, [primaryWallet])

  const router = useRouter()
  const handleStaking = async () => {
    if (!primaryWallet) {
      console.error('Wallet not available')
      return
    }

    const transaction = new SolanaTransactionService(
      primaryWallet as SolanaWallet
    )
    switch (selectedOption) {
      case 'Bonk':
        try {
          const signature = await transaction.createBonk(Number(amount))
          const explorerTx = `https://explorer.solana.com/tx/${signature}?cluster=devnet`
          Swal.fire({
            icon: 'success',
            title: 'Transaction success',
            html: `Your transaction is successful. <br> 
           <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
           View on Explorer
           </a>`,
            confirmButtonText: 'Confirm'
          })
          router.push('/get-start/match')
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Transaction error',
            text: `${error}`,
            confirmButtonText: 'Confirm'
          })
        }
        break
      case 'MemeDoge':
        try {
          const explorerTx = await transaction.createMemeDoge(Number(amount))
          Swal.fire({
            icon: 'success',
            title: 'Transaction success',
            html: `Your transaction is successful. <br> 
           <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
           View on Explorer
           </a>`,
            confirmButtonText: 'Confirm'
          })
          router.push('/get-start/match')
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Transaction error',
            text: `${error}`,
            confirmButtonText: 'Confirm'
          })
        }
        break
      case 'OPOZ':
        try {
          const explorerTx = await transaction.createOPOZ(Number(amount))
          Swal.fire({
            icon: 'success',
            title: 'Transaction success',
            html: `Your transaction is successful. <br> 
             <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
             View on Explorer
             </a>`,
            confirmButtonText: 'Confirm'
          })
          router.push('/get-start/match')
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Transaction error',
            text: `${error}`,
            confirmButtonText: 'Confirm'
          })
        }
        break
      case 'OPOS':
        try {
          const explorerTx = await transaction.createOPOS(Number(amount))
          Swal.fire({
            icon: 'success',
            title: 'Transaction success',
            html: `Your transaction is successful. <br> 
               <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
               View on Explorer
               </a>`,
            confirmButtonText: 'Confirm'
          })
          router.push('/get-start/match')
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Transaction error',
            text: `${error}`,
            confirmButtonText: 'Confirm'
          })
        }
        break
      case 'Pepe':
        try {
          const explorerTx = await transaction.createPepe(Number(amount))
          Swal.fire({
            icon: 'success',
            title: 'Transaction success',
            html: `Your transaction is successful. <br> 
                 <a href="${explorerTx}" target="_blank" style="color: #3085d6; text-decoration: underline;">
                 View on Explorer
                 </a>`,
            confirmButtonText: 'Confirm'
          })
          router.push('/get-start/match')
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Transaction error',
            text: `${error}`,
            confirmButtonText: 'Confirm'
          })
        }
        break
    }
  }

  return (
    <div className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[800px] p-4 md:p-6 lg:p-8 mb-16">
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <span className="text-sm md:text-sm lg:text-base text-gray-500">
          Hi <br />
          {primaryWallet?.address ? formatAddress(primaryWallet.address) : ''}
        </span>
        <span className="text-lg md:text-xl lg:text-2xl">👋</span>
      </div>

      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
        Let&apos;s Play
      </h1>

      <div className="flex justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl lg:text-2xl text-yellow-400">
            🕹️
          </span>
          <div>
            <p className="font-bold text-base md:text-lg lg:text-xl">{chain}</p>
            <p className="text-xs md:text-xs lg:text-sm text-gray-500">
              Current chain
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl lg:text-2xl text-yellow-400">
            🪙
          </span>
          <div className="flex gap-2">
            <span className="font-bold text-base md:text-lg lg:text-xl">
              {balance}
            </span>
            <span className="font-bold text-base md:text-lg lg:text-xl">
              {chain}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center mb-6 md:mb-4">
        <div className="space-y-6">
          <p className="font-bold text-2xl md:text-4xl">How to play?</p>
          <ul className="space-y-2 text-pretty">
            <li>1. Click Start !</li>
            <li>2. Select your token, that you would like to stake.</li>
            <li>3. Enjoy your game.</li>
          </ul>
        </div>
      </div>
      <div className="flex my-48" />
      <button
        onClick={toggleOpen}
        className="w-full bg-cyan-400 text-white py-3 md:py-4 rounded-full font-medium text-sm md:text-base lg:text-lg hover:bg-cyan-500 transition-colors"
      >
        Start
      </button>
      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={toggleOpen}
        >
          <section
            className="bg-white text-black border-4 border-cyan-400 p-3 rounded-xl shadow-lg w-2/3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <X
                onClick={toggleOpen}
                className="hover:rotate-90 duration-300"
              />
            </div>
            <h2 className="text-lg font-bold">Let&rsquo;s start</h2>
            <p className="mt-2">
              Select staking token & Enter the amount you wish to stake.
            </p>

            {/* Select box with 5 options */}
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.currentTarget.value)}
              className="mt-4 w-full py-2 px-3 border rounded-md"
            >
              <option value="Bonk">Bonk</option>
              <option value="MemeDoge">MemeDoge</option>
              <option value="OPOZ">OPOZ</option>
              <option value="OPOS">OPOS</option>
              <option value="Pepe">Pepe</option>
            </select>

            <input
              type="number"
              min={0}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-4 w-full py-2 px-3 border rounded-md"
              placeholder="Amount"
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={handleStaking}
                className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600"
              >
                Confirm
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
