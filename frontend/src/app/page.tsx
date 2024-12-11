'use client'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { useEffect, useState } from 'react'
import Hall from '@/components/hall'

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
       <Hall />
    </div>
  )
}
