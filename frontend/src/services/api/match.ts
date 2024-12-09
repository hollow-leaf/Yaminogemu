import { serverlessHost } from './config'

export async function matchRegister(
  address: string,
  tokenType: string
): Promise<{ result: boolean; error: unknown; match_id: number }> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify({
      address: address, // Or just `address` (shorthand syntax in ES6)
      token: tokenType
    })
  }
  try {
    const res = await fetch(serverlessHost + '/match', requestOptions)
    console.log(res)
    const _res = await res.json()
    return _res
  } catch (e) {
    console.log(e)
    return { result: false, error: 'Something wrong', match_id: -1 }
  }
}

export async function matchQueue(
  match_id: number
): Promise<{ result: boolean; error: unknown; game_id: number }> {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Ensure the server knows you're sending JSON
    },
    body: JSON.stringify({
      match_id: match_id // Or just `address` (shorthand syntax in ES6)
    })
  }
  try {
    const res = await fetch(serverlessHost + '/match/queue', requestOptions)
    console.log(res)
    const _res = await res.json()
    return _res
  } catch (e) {
    console.log(e)
    return { result: false, error: 'Something wrong', game_id: -1 }
  }
}
