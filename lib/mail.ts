import {Resend} from "resend"

const resend=new Resend(process.env.RESEND_API_KEY)



export const  sendPasswordResetEmail=async (email:string,token:string)=>{


const resetLink=`http://localhost:3000/auth/new-password?token=${token}`;


await resend.emails.send({
    from:"onboarding@resend.dev",
    to:email,
    subject:"Password Reset",
         html:`<p>Click <a href="${resetLink}">Here</a> to reset password .</p>`
})


}


///Rememeber use in action/regestration

export const sendVerificationEmail=async (
    email:string,
    token:string)=>
        {
const confirmLink=`http://localhost:3000/auth/new-verification?token=${token}`;

await resend.emails.send({
    from:"onboarding@resend.dev",
    to:email,
    subject:"confrim your email",
    html:`<p>Click <a href="${confirmLink}">Here</a> to confirm your email.</p>`

})


}


