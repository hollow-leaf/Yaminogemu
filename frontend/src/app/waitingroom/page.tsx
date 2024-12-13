'use client'
import { matchQueue, matchRegister } from '@/services/api/match'
import { userRegister } from '@/services/api/user'
import { cn, sleep } from '@/utils/strignfy'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  useIsLoggedIn,
  useDynamicContext
} from "@dynamic-labs/sdk-react-core";
import { isSolanaWallet } from '@dynamic-labs/solana';
import { PublicKey } from '@solana/web3.js'
import { TokenSelection } from '@/components/tokenSelection'
import { SolanaTransactionService } from '@/hooks/solanahook'
import { SolanaWallet } from '@dynamic-labs/solana-core'

function Gaming() {
  const router = useRouter()

  const isLoggedIn = useIsLoggedIn()
  const { primaryWallet } = useDynamicContext();

  const [userAddr, setUserAddr] = useState<string | null>(null)
  const [isWaiting, setIsWaiting] = useState<boolean>(false)
  const [matchId, setMatchId] = useState<number>(-1)
  const [tokenType, setTokenType] = useState<"Doge" | "OPOZ" | "OPOS" | "Pepe">('Doge')
  const [gameId, setGameId] = useState<number>(-1)
  const [tokenListModal, setTokenListModal] = useState<boolean>(false)

  useEffect(() => {
    if(isLoggedIn) {
      if(primaryWallet != null) {
        if(!isSolanaWallet(primaryWallet)) {
          router.replace('/')
        }
        const fromKey = new PublicKey(primaryWallet.address); 
        setUserAddr(fromKey.toBase58())
      } else {
        router.replace('/')
      }
      router.replace('/waitingroom')
    } else {
      router.replace('/')
    }
  }, [])

  useEffect(() => {
    if (gameId == -1) return
    router.replace(`/gaming?game_id=${gameId}&tokentype=${tokenType}`)
  }, [gameId])

  async function _matchRegister() {
    setIsWaiting(true)
    setTokenListModal(false)
    console.log(userAddr)
    if (userAddr == null) {
      setIsWaiting(false)
      return
    }
    const res = await userRegister(userAddr)
    if (!res.result) {
      setIsWaiting(false)
      return
    }
    if (matchId != -1 && tokenType == null) {
      setIsWaiting(false)
      return
    }
    const res0 = await matchRegister(userAddr, tokenType as string)

    if (res0.match_id == -1) {
      setIsWaiting(false)
      return
    }
    setMatchId(res0.match_id)

    const _game_id = await queueWaiting(res0.match_id)
    if (_game_id < 0) {
      setIsWaiting(false)
      return
    } else {
      setGameId(_game_id)
      setIsWaiting(false)
    }
  }

  async function queueWaiting(match_id: number): Promise<number> {
    while (true) {
      const res1 = await matchQueue(match_id)
      if (!res1.result) return -1
      if (res1.game_id >= 0) return res1.game_id
      await sleep(1500)
    }
  }
  return (
    <div
      className="flex flex-col min-h-screen items-center p-4"
    >
      <div
        className={cn(
          'flex flex-col items-center absolute top-0 mx-4 transition-all ease-in-out duration-700',
          isWaiting ? 'mt-[250px]' : 'mt-6'
        )}
      >
        <Image
          src="/a28128d9ff7c49c9ad33ee2f626fda40.png"
          width={100}
          height={100}
          alt="Picture of the author"
          className="rounded-full"
        />
        {isWaiting && (
          <div className="mt-[24px] text-[36px] animate-bounce">matching</div>
        )}
      </div>
      {!isWaiting && (
        <div>
          <div className="rounded-xl bg-white/30 w-full min-h-[300px] py-4 px-8 mb-[24px] mt-[130px] drop-shadow-xl">
            <div className="text-[36px] mb-[12px]">How to play?</div>
            <div className="text-[32px] mb-[12px]">Step1:</div>
            <div className="text-[28px] mb-[12px]">Pay memecoin</div>
            <div className="text-[32px] mb-[12px]">Step2:</div>
            <div className="text-[28px] mb-[12px]">Waiting for matching</div>
            <div className="text-[32px] mb-[12px]">Step3:</div>
            <div className="text-[28px] mb-[12px]">Win and earn <span className='text-[#F4CF20]'>Bonk</span>!</div>
          </div>
          <div className="w-full flex items-end">
            <button
              className="rounded-xl w-full text-2xl shadow px-4 py-2 bg-[#2C2D32] text-white"
              onClick={() => { setTokenListModal(true) }}
              disabled={isWaiting}
            >
              Start
            </button>
          </div>
        </div>
      )}
      <TokenSelection showBox={tokenListModal} closed={() => { setTokenListModal(false) }} isLoading={false} tokenSelected={{ selectedToken: tokenType, setSelectedToken: setTokenType }} matchRegister={_matchRegister}/>
    </div>
  )
}

export default Gaming
