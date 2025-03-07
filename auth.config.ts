import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "@/Data/user"
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schemas"
import bcrypt from "bcryptjs"
 import Google from "next-auth/providers/google"
export default { 
    //  providers: [GitHub] ,
     providers: [
         GitHub({
            clientId:process.env.GITHUB_CLENT_ID,
            clientSecret:process.env.GITHUB_CLENT_SECRET
         }),
         Google({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
         }),
         Credentials({
            async authorize(credentials){
               const validatedFields = LoginSchema.safeParse(credentials);

               if(validatedFields.success){
                const {email, password}=validatedFields.data;

                const user=await getUserByEmail(email);
                if(!user || !user.password) return null;

                const passwordMatch=await bcrypt.compare(password, user.password);
                if(passwordMatch) return user;

                
            }
            return null;
        }
         })
     ],
     basePath: "/api/auth",
} satisfies NextAuthConfig