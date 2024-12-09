'use client'

import { usePathname } from 'next/navigation'
import SelectBottom from '@/components/SelectBottom'

export default function ClientSideSelectBottom() {
  const pathname = usePathname()
  const excludePaths = ['/get-start/match', '/game', '/gaming']
  const shouldRenderSelectBottom = !excludePaths.includes(pathname)

  return shouldRenderSelectBottom ? <SelectBottom /> : null
}
