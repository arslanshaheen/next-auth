"use client";

import { logout } from "@/actions/logout";
// import { signOut } from "next-auth/react";


interface LogoutButtonProps{
    children?:React.ReactNode
}

export const LogoutButton=({children}:LogoutButtonProps)=>{

   const onclick=()=>{
        logout()
    }
    return (
        <span onClick={onclick} className="cursor-pointer">
            {children}
        </span>

    )
}