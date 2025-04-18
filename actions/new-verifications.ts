"use server"

import {db}  from "@/lib/db";
import { getUserByEmail } from "@/Data/user";

import { getVerificationTokenByToken } from "@/Data/verification-token";

import { error } from "console";

export const  newVerification = async (token:string)=>{

    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken){
        return {error: "token does not exist!"}

    }

    const hasExpired=new Date(existingToken.expires) < new Date()


    if(hasExpired){
        return {error:"token has expired!"}
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser){
        return {error:"Email does not exist!"}
    }

    await db.user.update({
        where:{
            id:existingUser.id
        },
        data:{
            emailVerified:new Date(),
            email:existingToken.email,
        }
    });

    await db.verficationToken.delete({
        where:{id:existingToken.id}
    });

    return {success:"Email verified!"}
}