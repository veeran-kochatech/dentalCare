import { useAuth } from "@context/authContext";
import axios from "axios";
import { useEffect } from "react";

export const getDocument = (elm: any): Document => (elm || {}).ownerDocument || document;
export const getWindow = (elm: any): typeof window => (getDocument(elm) || {}).defaultView || window;

export const validateJwt = (token: string)=>{
    const jwtPayload = JSON.parse(window.atob(token.split('.')[1]))
    console.log("jwtPayload ",jwtPayload)
    const isExpired = Date.now() >= jwtPayload.exp * 1000;
    console.log("isExpired ",isExpired)
    return isExpired
}


export const refreshToken = async()=>{
    const { setUserAuthInfo } = useAuth()

    useEffect(()=>{

        const refresh = async()=>{
            let auth_token: string | null;
            let refresh_token: string | null = '';
            if (typeof window !== 'undefined') {
                auth_token = localStorage.getItem('authToken')
                refresh_token = localStorage.getItem('refreshToken')
            }

            const apiURL = "https://ofs-alpha-document-parser.apps.nlpcore.net/token"

            let res = await axios.post(apiURL, {
                "refresh_token":refresh_token,
                "deployment_name": "bamboo",
                "grant_type": "refresh_token"
            })
            console.log(" refresh token ", res)

            if (typeof window !== 'undefined') {
                localStorage.setItem('authToken', res.data.access_token)
                localStorage.setItem('refreshToken', res.data.access_token)
            }
            setUserAuthInfo({
                token: res.data.access_token,
                refreshToken: res.data.access_token
            })
        }
        refresh()
    },[])

    return <></>

}