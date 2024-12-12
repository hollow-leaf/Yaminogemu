<div align="center">
<h1>Yaminogemu</h1>

<img src="./frontend/public/logo.png" width="50%" height="50%"></img>

</div>

### Our contracts address and Demo link
- Solana contract link:[2YacFff9ohCN71SJQCFbhrKUKXx1BhoHTFYWFWYqieZd](https://explorer.solana.com/address/2YacFff9ohCN71SJQCFbhrKUKXx1BhoHTFYWFWYqieZd?cluster=devnet)
- Demo video:

### Project Description

Yaminogemu is a game designed to facilitate "Bonk liquidity" through defi mechanism and a knowledge-based battle game, enabling users to stake a wide range of meme tokens on the Solana blockchain. By staking meme tokens to start a game, Yaminogemu matches you with another user. Then, the two players compete in a blockchain knowledge battle to determine the better player.

Moreover, Yaminogemu features a Swap function that allows users to exchange different meme tokens for BONK tokens. The winner can claim all of the loser’s staked tokens, which are converted into BONK.

Meme GameFi is a unique gamified financial platform within Yaminogemu that transforms traditional DeFi staking into an interactive experience. Here’s how it works:

1. Token Staking: Players stake their favorite meme tokens to initiate a game.
2. Competitive Gameplay: Players are matched in a blockchain knowledge battle designed to test and expand their understanding of the blockchain ecosystem.
3. Winner Takes All: The victorious player claims the staked tokens of their opponent. The tokens are then converted into BONK, further fueling the liquidity of the ecosystem.
This mechanism not only creates an engaging game but also enhances the utility and liquidity of meme tokens across the Solana blockchain.

The MEME Admin ETF is an innovative liquidity pool managed within the Yaminogemu ecosystem. It aims to provide users with a diversified investment mechanism while boosting the platform’s overall financial health. Key highlights include:

1. Diversified Staking Pool: The ETF aggregates a wide range of meme tokens, creating a robust liquidity pool that backs Yaminogemu’s Swap and gaming mechanisms.
2. Yield Optimization: Users who contribute to the MEME Admin ETF can earn rewards through transaction fees, swaps, and staking bonuses.
3. Community Governance: The MEME Admin ETF operates with a community-driven governance model, ensuring transparency and decentralized control over fund management.
4. Token Conversion & Swapping: Enables seamless conversion of staked tokens into BONK, supporting token liquidity and accessibility.

Through the MEME Admin ETF, Yaminogemu bridges the gap between gaming and DeFi, offering participants a secure and rewarding way to engage with the meme token ecosystem.

ZK ....

User flow圖

#### Key words: MEME DEFI, MEME GAMEFI, ZK

### How it's made

To achieve its swap functionalities, Yaminogemu uses Rust to develop game mechanism contracts and deploys them on the Solana devnet. These contracts implement various features, such as exchanging meme tokens for BONK, matching opponents, processing staked tokens, and managing staking withdrawals.

At the same time, Yaminogemu utilizes a serverless backend to create a game API and connects it with a beautifully designed front-end interface to deliver an engaging, knowledge-based on-chain battle game.

#### Technical stack
- Meme DeFi
- Meme GameFi
- ZK
- 時序圖

### Project Structure

- `frontend`: Next.js app with PWA and DynamicWallet for connect wallet
- `contracts`: Solana contract Rust environment
- `serverless`: Cloudflare hono framework Nodejs API and D1 noSQL Database 

### Team members
- Software Architect(Full Stack): [Solo Lin](https://github.com/LinXJ1204)
- Frontend engineer: [Jake Kuo](https://github.com/crypto0627)
- Blockchain engineer: [Albert Cheng](https://github.com/cheng-chun-yuan)
