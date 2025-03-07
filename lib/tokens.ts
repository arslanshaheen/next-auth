import { getVerificationTokenByToken } from "@/Data/verfication-token";
import {v4 as uuidv4} from "uuid";

import  {db} from "@/lib/db";

export const  generateVerficationToken = async (email:string) =>{

    const token = uuidv4();

    const  expires = new Date(new Date().getTime() + 3600 * 1000)


    const existingToken = await getVerificationTokenByToken(email)


    if(existingToken){

        await db.verficationToken.delete({
            where:{
                id:existingToken.id
            }
        })
    }
    const verificationToken = await db.verficationToken.create({
        data:{
            token,
            expires,
            email
        }
    })
    return verificationToken;
}