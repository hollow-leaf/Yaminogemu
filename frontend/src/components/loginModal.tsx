import { ModalXs } from "./ModalXS";

export function LoginModal(props: {showBox: any, closed: any, isLoading: any}) {

    const isLoggedIn = false

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
                    <div>

                    </div>
                </div>
            </ModalXs>
        </div>
    )
}