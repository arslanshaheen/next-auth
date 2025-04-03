import {db} from "@/lib/db"



export const getTwoFactorConfirmationByUserId= async(userId:string)=>{
    try {
        const  twoFactorConfiemation = await db.twoFactorConfirmation.findUnique({
                 where:{userId}
        })
        return twoFactorConfiemation
    } catch {
        return null
        
    }
}