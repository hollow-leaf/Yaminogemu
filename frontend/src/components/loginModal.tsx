import { ModalXs } from "./ModalXS";
import { SolanaConnect } from "./WalletMultiButton";
import { useWallet } from "@solana/wallet-adapter-react";

export function LoginModal(props: {showBox: any, closed: any, isLoading: any}) {

    const wallet = useWallet()
    const isLoggedIn = wallet.connected

    return (
        <div>
            <ModalXs
                showBox={props.showBox && !isLoggedIn}
                closed={props.closed}
                isLoading={props.isLoading}
            >
                <div
                    className="flex items-center justify-center w-[300px] h-[100px]"
                >
                    <SolanaConnect />
                </div>
            </ModalXs>
        </div>
    )
}