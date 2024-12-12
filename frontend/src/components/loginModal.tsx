"use client"
import { ModalXs } from "./ModalXS";
import {
    DynamicContextProvider,
    DynamicWidget,
    useIsLoggedIn,
    Wallet,
    useDynamicContext
} from "@dynamic-labs/sdk-react-core";
import { isSolanaWallet } from '@dynamic-labs/solana';
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect } from "react";

export function LoginModal(props: {showBox: any, closed: any, isLoading: any}) {

    const isLoggedIn = useIsLoggedIn()
    const { primaryWallet } = useDynamicContext();
    if(primaryWallet) {
        const fromKey = new PublicKey(primaryWallet.address); 
        console.log(fromKey)
    }

    async function test() {
        if(isLoggedIn) {
            if(primaryWallet != null) {
                if(!isSolanaWallet(primaryWallet)) {
                    return
                }
                  
                const connection: Connection = await primaryWallet.getConnection();
                
                const fromKey = new PublicKey(primaryWallet.address); 

                console.log(fromKey.toBase58())
            }
        }
    }


    useEffect(() => {
        test()
    }, [isLoggedIn])

    return (
        <div>
            <ModalXs
                showBox={props.showBox}
                closed={props.closed}
                isLoading={props.isLoading}
            >
                <div
                    className="flex items-center justify-center w-[300px] h-[100px]"
                >
                    <DynamicWidget />

                </div>
            </ModalXs>
        </div>
    )
}