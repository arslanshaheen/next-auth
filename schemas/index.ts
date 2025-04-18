import * as z from "zod";


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