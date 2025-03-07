"use server"

import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/Data/user";

import {generateVerficationToken} from '@/lib/tokens'
import {sendVerificationEmail} from '@/lib/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values)
         if (!validatedFields.success) {
            return { error: "Invalid fields!" }
         }

        // TODO: Implement actual login logic here
        const {name, email, password} = validatedFields.data

        const hashedPassword = await bcrypt.hash(password, 10)
        //api findUnique
        const existingUser=await getUserByEmail(email);
        if(existingUser){
                return { error: "Account already exists!" }
        }
        await db.user.create({
                data:{
                        name,
                        email,
                        password:hashedPassword}
        })
        const verificationToken = await generateVerficationToken(email);

        await sendVerificationEmail(
                verificationToken.email,
                verificationToken.token
        );

        ///todo:send verificatons token email
        return { success: "confrimation email sent!" }
}