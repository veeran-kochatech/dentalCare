import { ReactNode } from "react"

export type Props = {
    children: ReactNode
}

export type sortColumn = {
    label: string;
    handleSort: (arg0: string, arg1: string)=>{}
}


export type SlideOverProps = {
    children: ReactNode;
    mode: string;
    heading: string;
}

export type regionProps = {
    showModal: boolean;
    selectedText: string;
    closeModal:()=>{}
}

export type urlProps = {
    url: string;
}

export type ListRowProps = {
    position: string;
}
export type modalProps = {
    status: boolean;
    children: ReactNode;
    closeModal:()=>{}
}

export type notification = {
    title: string;
    message: string;
    showNotificaion: boolean;
}