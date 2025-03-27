"use server";
import * as z from "zod";


import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/Data/user";

import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePassswordResetToken } from "@/lib/tokens";

export  const  reset = async (values:z.infer<typeof ResetSchema>)=>{
const validatedFields = ResetSchema.safeParse(values)

if (!validatedFields.success) {

   return { error: "Invalid email!" }
}

const  {email}= validatedFields.data

const existingUser = await  getUserByEmail(email);

if(!existingUser){
    return { error: "Email does not exist!" }
}


//Todo generate password reset token

const passwordResetToken = await generatePassswordResetToken(email);
await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token

);

return { success: "reset email sent!" }

}