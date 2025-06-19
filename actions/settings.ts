

"use server";
import { sendVerificationEmail } from '@/lib/mail';
import * as z from "zod";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas"
import { getUserByEmail, getUserById } from "@/Data/user";
import { currentUser } from "@/lib/currentUser";
import { generateVerficationToken } from "@/lib/tokens";
import bcrypt from 'bcryptjs';



export const settings= async (
      values: z.infer<typeof SettingsSchema>
)=>{
    const user= await currentUser();

    if(!user){
        return { error:"Unauthorized"}
    }

    const dbUser = await getUserById(user.id)

    if(!dbUser){
        return { error:"Unauthorized"}
    }
if(user.isOAuth){
    values.email=undefined
    values.password=undefined
    values.newPassword=undefined
    values.isTwoFactorEnabled=undefined
}



///how chage new email
if(values.email && values.email !==user.email){
    const existingUser=await getUserByEmail(values.email)

    if(existingUser && existingUser.id !==user.id){
        return {error: "Email already in use"}
    }

    const verficationToken= await generateVerficationToken(values.email)
    await sendVerificationEmail(
        verficationToken.email,
        verficationToken.token,
    )
    return {success:"verfication email send "}

}


if(values.password && values.newPassword && dbUser.password){
    const passwordsMatch= await bcrypt.compare(
        values.password,
        dbUser.password
    )

    if(!passwordsMatch){
        return {error:"incorrect password not match"}
    }

    const hashedPassword=await bcrypt.hash(
        values.newPassword,
        10
    )
    values.password=hashedPassword
    values.newPassword=undefined
}



    await db.user.update({
        where:{id:dbUser.id},
        data:{
            ...values,
        }
    });

    return {success:"Settings Update!"}


}