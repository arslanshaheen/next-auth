"use server"
import { signIn } from "@/auth"
import * as z from "zod"
import { LoginSchema } from "@/schemas"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { generateVerficationToken
     ,generateTwoFactorToken
    } from "@/lib/tokens"
import { getUserByEmail } from "@/Data/user"
import {
    sendVerificationEmail,
    sendTwoFactorTokenEmail,
} from '@/lib/mail'
import { getTwoFactorConfirmationByUserId } from "@/Data/two-factor-confirmation"
import { getTwoFactorTokenByEmail } from "@/Data/two-factor-token"
import { error } from "console"
import { db } from "@/lib/db"
export const login = async (values: z.infer<typeof LoginSchema>,callbackUrl?:string,) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password,code } = validatedFields.data;
    const existingUser = await getUserByEmail(email);

    if (!existingUser ||
         !existingUser.email || 
         !existingUser.password) {
        return { error: "Invalid email or password!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerficationToken(existingUser.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token);
            
        return { success: "Confirmation email sent!" }
    }


    if(existingUser.isTwoFactorEnabled && existingUser.email){

        if(code){
            //todo verification code
            const twoFactorToken=await getTwoFactorTokenByEmail(
                existingUser.email
            );
            if(!twoFactorToken){
                return {error:"Invalid code!"}
            }

            if(twoFactorToken.token !==code){
                return {error:"Invalid code check it!"}
            }

            const hasExpired=new Date(twoFactorToken.expires) < new Date()

            if(hasExpired){
                return {error:"code is expired"}
            }

           await db.twoFactorToken.delete({
            where:{id: twoFactorToken.id}
           })

           const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
           if(existingConfirmation){
            await db.twoFactorConfirmation.delete({

                where:{id:existingConfirmation.id}
            });
           }
           await db.twoFactorConfirmation.create({
            data:{
                userId:existingUser.id
            }
           })
        }else{
        const twoFactorToken=await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token,
        );
        return {twoFactor:true}
    }
}

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
        return { success: "Login successful!" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid email or password!" }
                default:
                    return { error: "Something went wrong" }
            }
        }
        throw error;
    }
}
