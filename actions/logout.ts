"use server"

import {signOut} from "@/auth"

export const logout=async()=>{
    //some sever stuff
    await signOut()
}