import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export const stringify: typeof JSON.stringify = (value, replacer, space) =>
  JSON.stringify(
    value,
    (key, value_) => {
      const value = typeof value_ === 'bigint' ? value_.toString() : value_
      return typeof replacer === 'function' ? replacer(key, value) : value
    },
    space
  )

export function formatAddress(address: string) {
  if (!address) {
    return '' // If the address is undefined, return an empty string
  }
  if (address.length <= 12) {
    return address // If the address is shorter than 12 characters, return it as is
  } else {
    const prefix = address.slice(0, 6) // Get the first six characters
    const suffix = address.slice(-6) // Get the last six characters
    return `${prefix}...${suffix}` // Combine the first six, ..., and last six characters
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numberToBytes(num: number): Uint8Array {
  // Create an ArrayBuffer with a size of 8 bytes (64 bits)
  const buffer = new ArrayBuffer(8)
  // Create a DataView representing the buffer
  const view = new DataView(buffer)

  // Set the 64-bit float at byte 0, assuming little-endian byte order
  // JavaScript uses 64-bit floating point as its number type
  view.setFloat64(0, num, true) // The 'true' parameter indicates little endian

  // Alternatively, if you need a 64-bit integer, you can use setBigInt64 if the number is an integer
  // view.setBigInt64(0, BigInt(num), true); // Uncomment this line for 64-bit integer

  // Create a Uint8Array from the ArrayBuffer to return
  return new Uint8Array(buffer)
}
