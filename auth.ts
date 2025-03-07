// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// //import Google from "next-auth/providers/google"
 
// export const authOptions = {
//   providers: [GitHub],
//   basePath: "/api/auth",
// }

// export const { auth, handlers: { GET, POST } } = NextAuth(authOptions);
import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./Data/user"
import { UserRole } from "@prisma/client"




 
export const 
{ auth, handlers, signIn, signOut } 
= NextAuth({
   pages:{
    signIn:"/auth/login",
    error:"/auth/error",
   },

events:{



 async linkAccount({user}){
  await db.user.update({
    where:{id:user.id},
    data:{ emailVerified:new Date() }
  })
 }
},
    callbacks:{

      async signIn({ user, account }) {


        console.log({
          user, 
          account
        })
        // Allow OAuth without email verifications
        if (account?.provider !== "credentials") return true;
    
        if (!user.id) return false; // Ensure user.id is defined before calling function
    
   
        const existingUser = await getUserById(user.id);


     ///prevent sign in without email verfications
        if (!existingUser?.emailVerified) return false;
        
        // Add 2FA check TODO
        
    
        return true;
    },
    
      // async signIn({user}){
      //   const existingUser = await getUserById(user.id) 
      //   if(!existingUser || !existingUser.emailVerified){
      //   if(!existingUser || !existingUser.emailVerified){
      //       return false
      //   }

      //   return true

      // },

          async session({session,token}){
             console.log({
                sessionToken:token,
                session
            })

            // if(session.user){
             //session.user.custumField=token.custumField
              if ( token.sub && session.user){
          session.user.id=token.sub;

        }

        if(token.role && session.user){
            session.user.role=token.role as UserRole
        }
            return session;
          },

        async jwt({token}){
          if(!token.sub) return token;
          const existingUser=await getUserById(token.sub);
          if(!existingUser) return token;
            // console.log({token})
            // token.custumField="TEST"
            token.role=existingUser.role;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
  ...authConfig,
  session: {
    strategy: "jwt",
  },
}) 