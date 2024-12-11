import { FC } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");

export const SolanaConnect: FC = () => {
  return (
    <WalletModalProvider>
      <WalletMultiButton />
    </WalletModalProvider>
  );
}