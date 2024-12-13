import { ModalXs } from "./ModalXS";

export function TokenSelection(props: {showBox: any, closed: any, isLoading: any, tokenSelected: {selectedToken: string, setSelectedToken: any}, matchRegister: any}) {

    const tokenList: string[] = ["Doge", "OPOZ", "OPOS", "Pepe"]

    return (
        <div>
            <ModalXs showBox={props.showBox} closed={props.closed} isLoading={props.isLoading} >
                <div className="w-[300px]">
                    <form className="mb-[24px]">
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={props.tokenSelected.selectedToken}
                            onChange={(e) => {
                                console.log(e.target.value)
                                props.tokenSelected.setSelectedToken(e.target.value);
                            }}
                        >
                        {tokenList.map((token, index) => (
                            <option className="text-2xl" key={index} value={token}>
                                {token}
                            </option>
                        ))}
                        </select>
                    </form>
                    <button
                        className="rounded-xl w-full text-2xl shadow px-4 py-2 bg-[#2C2D32] text-white"
                        onClick={() => {
                            if(props.tokenSelected.selectedToken != "") {
                                props.matchRegister()
                            }
                        }}
                    >
                        Pay
                    </button>
                </div>
            </ModalXs>
        </div>
    )
}