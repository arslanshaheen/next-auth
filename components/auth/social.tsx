"use client";
//use in card-wrapper


import {signIn} from "next-auth/react"

import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {Button} from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Soical=()=>{


    const onClick=(provider: "github" | "google")=>{
        signIn(provider,{

            callbackUrl:DEFAULT_LOGIN_REDIRECT
        })

    }



    return(
        <div className="flex items-center w-full gap-x-2">
            <Button
             variant="outline"
            className="w-full"
            onClick={()=>onClick("google")}
           >
                <FcGoogle className="h-5 w-5"/>
            </Button>
            <Button
             variant="outline"
            className="w-full"
            onClick={()=>onClick("github")}
           >
                <FaGithub className="h-5 w-5"/>
            </Button>
        </div>
            
      
    )
}