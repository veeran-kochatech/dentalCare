import { ReactNode, useEffect } from "react"
import MenuWrapper from "./MenuWrapper"
import { Props } from '../../types/common.types';
import { useRouter } from "next/router";



const Layout =({children}:Props)=>{
    const router = useRouter()

    useEffect(()=>{

        let auth_token, refresh_token;
        if( auth_token === '' || auth_token === undefined ){
            router.push("/auth/login");
        }
    },[])

    useEffect(()=>{
        if (typeof window !== 'undefined') {
            let auth_token = localStorage.getItem('authToken')
            if( auth_token === '' || auth_token === undefined ){
                router.push("/auth/login");
            }
        }
    },[])

    if(router.pathname === '/auth/login' || router.pathname === '/auth/redirect'){
        return <div>{children}</div>
    }
    
    return <>
            <MenuWrapper>
                {children}
            </MenuWrapper>
        </>
}

export default Layout