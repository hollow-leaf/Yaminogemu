export type Quiz = {
  problems_id: number
  q0: string
  q1: string
  q2: string
  q3: string
  q4: string
  answer: number
}

export type Result = {
  match_id: number
  user1_addr: string
  user2_addr: string
  user1_token: 'Doge' | 'OPOZ' | 'OPOS' | 'Pepe'
  user2_token: 'Doge' | 'OPOZ' | 'OPOS' | 'Pepe'
  game_id: number
}
