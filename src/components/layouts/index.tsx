import { ReactNode, useEffect } from "react"
import MenuWrapper from "./MenuWrapper"
import { useRouter } from "next/router";

type Props = {
    children: ReactNode
  }


const Layout =({children}:Props)=>{
    const router = useRouter()

    useEffect(()=>{
        console.log("auth_token")
        if (typeof window !== 'undefined') {
            let auth_token = localStorage.getItem('authToken')
            console.log("auth_token ",auth_token)
            if( auth_token === '' || auth_token === undefined ){
                router.push("/auth/login");
            }
        }
    },[])

    if(router.pathname === '/auth/login'){
        return <div>{children}</div>
    }
    
    return <>
            <MenuWrapper>
                {children}
            </MenuWrapper>
        </>
}

export default Layout