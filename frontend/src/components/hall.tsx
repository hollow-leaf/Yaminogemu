import Link from 'next/link'

const hall_data = [
  [
    { char: 'B', color: 'bg-orange-400 text-white' },
    { char: 'L', color: 'bg-white text-gray-300' },
    { char: 'O', color: 'bg-white text-gray-300' },
    { char: 'C', color: 'bg-white text-gray-300' },
    { char: 'K', color: 'bg-orange-400 text-white' }
  ],
  [
    { char: 'C', color: 'bg-orange-400 text-white' },
    { char: 'H', color: 'bg-white text-gray-300' },
    { char: 'A', color: 'bg-orange-400 text-white' },
    { char: 'I', color: 'bg-white text-gray-300' },
    { char: 'N', color: 'bg-orange-400 text-white' }
  ],
  [
    { char: 'B', color: 'bg-white text-gray-300' },
    { char: 'R', color: 'bg-orange-400 text-white' },
    { char: 'A', color: 'bg-white text-gray-300' },
    { char: 'I', color: 'bg-orange-400 text-white' },
    { char: 'N', color: 'bg-white text-gray-300' }
  ]
]

export default function Hall() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[90%] max-w-[400px] md:max-w-[600px] lg:max-w-[800px] aspect-[9/16] md:aspect-[12/16] lg:aspect-[14/16] rounded-xl p-6">
        {/* Title Section */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center text-5xl md:text-6xl lg:text-7xl font-bold text-white">
            <span role="img" aria-label="Crown">
              👑
            </span>
            <span>Yaminogemu</span>
          </div>
          <p className="mt-4 text-gray-200 text-base md:text-lg lg:text-xl font-medium">
            Challenge other players to see who has more blockchain knowledge &
            Win bonk tokens
          </p>
        </div>

        {/* Puzzle Section */}
        <div className="grid gap-y-3">
          {hall_data.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`flex justify-center ${
                rowIndex % 2 !== 0 ? 'ml-[5%]' : ''
              }`}
            >
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  className={`hex ${cell.color} text-lg md:text-2xl w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center font-bold`}
                >
                  {cell.char}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Button Section */}
        <div className="space-y-4 text-center mt-12">
          <Link
            href="/get-start"
            className="flex justify-center w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-bold py-3 md:py-4 lg:py-5 rounded-2xl shadow-md hover:opacity-90"
          >
            Play
          </Link>
        </div>
      </div>
    </div>
  )
}
