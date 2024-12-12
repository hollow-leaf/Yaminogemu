import Link from 'next/link'
import Image from 'next/image'

export default function SelectBottom() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="flex justify-around items-center max-w-screen-xl mx-auto">
        <Link href="/waitingroom" className="flex flex-col items-center">
          <span className="text-2xl">
            <Image alt="home" src="/home.png" width={20} height={20} />
          </span>
          <span className="text-xs text-gray-600">Game</span>
        </Link>
        <Link href="/token-list" className="flex flex-col items-center">
          <span className="text-2xl">
            <Image
              alt="token-list"
              src="/insights.png"
              width={20}
              height={20}
            />
          </span>
          <span className="text-xs text-gray-600">Token list</span>
        </Link>
        {/* open windows and do something with dynamic wallet */}
        <Link href="/defi" className="flex flex-col items-center">
          <span className="text-2xl">
            <Image alt="diamond" src="/diamond.png" width={20} height={20} />
          </span>
          <span className="text-xs text-gray-600">DeFi</span>
        </Link>
      </div>
    </div>
  )
}
