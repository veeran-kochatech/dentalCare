import React, { Children, ReactNode } from "react";
import Image from "next/image";
import logo from "../../../assets/logo.jpg"
import Bel from "../assets/bell";
import Lo from '../assets/logout'
import pro from "../assets/profile.png";
import { useRouter } from "next/router";
import { FaHospitalUser } from "react-icons/fa";

const HospitalUser = () => {
    return <FaHospitalUser/>
}
export default function WithSidebar(props: { children: ReactNode }) {
    const router = useRouter()

    const logout =()=>{
        if (typeof window !== 'undefined') {
            localStorage.setItem('authToken','')
            localStorage.setItem('refreshToken','')
         }
         router.push("/auth/login");
    }

    let hostname='';
    if (typeof window !== 'undefined') {
        hostname = window.location.hostname;
     }
    const route = useRouter()
    const pages = [
        {
            label: 'Patients',
            path: '/patients',
            icon: <HospitalUser />
        },
    ]
    const getTitle =()=>{
        let currentPage = route.pathname
        currentPage = "/"+currentPage.split('/')[1]
        let x = pages.filter(val => val.path === currentPage)
        return x.length <= 0? "":x[0]['label']
    }

    return (
        <div className="flex flex-row m-0 p=0 box-border w-full h-full ">
            <div className="flex flex-col absolute box-border bg-white border-r-2 border-color4 border-solid w-60 h-screen pr-10" >

                {/* Logo Part */}
                <div className="mt-6 mr-8  ml-6 mb-10">
                    <Image src={logo}/>
                    {/* <Logo /> */}
                </div>
                {/* Nav_Bar */}
                <div className="flex flex-col">
                    {pages.map(page=>{
                        return(
                            <a href={page.path} key={page.label}>
                                <div className={getTitle() == page.label ? 
                                        " w-56 h-16 flex flex-row items-center  not-italic font-medium text-base leading-3 font-['Roboto'] bg-blue-50 text-gray-800 rounded-r-3xl" 
                                        : "w-56 h-16 flex flex-row items-center  not-italic font-medium text-base leading-3 text-gray-500 font-['Roboto'] hover:bg-color2 hover:text-gray-600 hover: rounded-r-3xl"}>
                                    <div className="ml-8 mr-4">
                                        {page.icon}
                                    </div>
                                    {page.label}
                                </div>
                            </a>
                        )
                    })}
                    
                </div>
                <div className="flex flex-grow mb-12">
                    <div
                        onClick={()=>logout()} 
                        className={"mt-auto cursor-pointer w-56 h-16 flex flex-row items-center  not-italic font-medium text-base leading-3 text-gray-500 font-['Roboto'] hover:bg-color2 hover:text-gray-600 hover: rounded-r-3xl"}>
                        <div className="ml-8 mr-4">
                            <Lo/>
                        </div>
                        {"Logout"}
                    </div>
                </div>
            </div>

            {/* Upload Session */}
            <div className="pl-[240px] w-full flex flex-col">
                <div className="w-full h-24  box-border border-b-2 border-solid items-center flex justify-between">
                    <p className="h-6 font-['Roboto'] not-italic font-semibold text-2xl leading-6 flex text-gray-700 items-center ml-8">{getTitle()}</p>
                    <div className="flex flex-row items-center gap-6 pr-2 pb-2">
                        <Bel></Bel>
                        <Image src={pro}></Image>
                    </div>
                </div>
                <main>
                    <div className="bg-bgcolor h-screen p-8 overflow-y-auto pb-[140px]">
                        {props.children}
                    </div>
                </main>
            </div>
            
            
        </div>
    );
};