<div align="center">
<h1>Yaminogemu</h1>

<img src="./frontend/public/favicon.ico" width="50%" height="50%"></img>

</div>

### Our contracts address and Demo link
- Solana contract:
- Demo video:

### Project Description

Yaminogemu is a game designed to facilitate "Bonk liquidity" through defi mechanism and a knowledge-based battle game, enabling users to stake a wide range of meme tokens on the Solana blockchain. By staking meme tokens to start a game, Yaminogemu matches you with another user. Then, the two players compete in a blockchain knowledge battle to determine the better player.

Moreover, Yaminogemu features a Swap function that allows users to exchange different meme tokens for BONK tokens. The winner can claim all of the loser’s staked tokens, which are converted into BONK.

### How it's made

To achieve its swap functionalities, Yaminogemu uses Rust to develop game mechanism contracts and deploys them on the Solana devnet. These contracts implement various features, such as exchanging meme tokens for BONK, matching opponents, processing staked tokens, and managing staking withdrawals.

At the same time, Yaminogemu utilizes a serverless backend to create a game API and connects it with a beautifully designed front-end interface to deliver an engaging, knowledge-based on-chain battle game.

### Project Structure

- `frontend`: Next.js app with PWA and DynamicWallet for connect wallet
- `contracts`: Solana contract Rust environment
- `serverless`: Cloudflare hono framework Nodejs API and D1 noSQL Database 

### Team members
- System Architect: [Solo Lin](https://github.com/LinXJ1204)
- Frontend engineer: [Jake Kuo](https://github.com/crypto0627)
- Blockchain engineer: [Albert Cheng](https://github.com/cheng-chun-yuan)
