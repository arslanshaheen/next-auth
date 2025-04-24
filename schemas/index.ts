import { UserRole } from "@prisma/client";
import * as z from "zod";


export  const SettingsSchema=z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled:z.optional(z.boolean()),
    role:z.enum([UserRole.ADMIN, UserRole.USER]),
    email:z.optional(z.string().email()),
    password:z.optional(z.string().min(6)),
    newPassword:z.optional(z.string().min(6))
})
   .refine((data)=>{
          if(data.password && !data.newPassword){
            return false
          }
          
          return true

   },
   {
    message:'new password required',
    path:["newPassword"]
   }
)

.refine((data)=>{
    
    if(!data.password && data.newPassword){
      return false
    }
    return true

},
{
message:' password required',
path:["password"]
}
)


export const NewPasswordSchema = z.object({
    password:z.string().min(6,{message:"Password is required 6 characters "}),
})

export const ResetSchema = z.object({
    email:z.string().email({
        message:"check your email address"
   
}),

})

export const LoginSchema = z.object({
    email:z.string().email({
        message:"Invalid email address"
    }),
    password:z.string().min(1,{message:"Password is required"

    }),
    code:z.optional(z.string()),
})

// ensure that the data structures in your application match the
//  expected formats, which is particularly useful in TypeScript
//   projects where type safety is a priority.

export const RegisterSchema = z.object({
    name:z.string().min(1,{message:"Name is required"}),
    email:z.string().email({
        message:"Invalid email address   "
    }),
    password:z.string().min(6,{message:"must be at least 6 characters"}),
    
})