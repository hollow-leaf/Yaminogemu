import { serverlessHost } from "./config";

export async function userRegister(address: string): Promise<{ "result": boolean, "error": unknown }> {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Ensure the server knows you're sending JSON
        },
        body: JSON.stringify({
            address: address,  // Or just `address` (shorthand syntax in ES6)
        }),
    };
    try {
        const res = await fetch(serverlessHost + "/user", requestOptions)
        console.log(res)
        const _res = await res.json()
        return _res
    } catch(e) {
        console.log(e)
        return { result: false, "error": "Something wrong" }
    }
}