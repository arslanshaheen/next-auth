"use client";

import {BeatLoader} from "react-spinners"

import { newVerification } from "@/actions/new-verifications";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback , useEffect , useState } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form.success";


export const NewVerificationForm = () => {
    const [error , setError]=useState<string | undefined>();
    const [success , setSuccess]=useState<string | undefined>();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");


    const  onSubmit=useCallback(()=>{

        if(success || error) return;

        if(!token) {
            setError("missing token!")
            return
        }
        // console.log(token)
        newVerification(token)
        .then((data)=>{
            setError(data.error)
            setSuccess(data.success)
        }).catch((error)=>{
            setError("something went wrong!")
        })
    },[token, success, error]);

     useEffect(()=>{
        onSubmit()

     },[onSubmit])

    return (
        <CardWrapper
        headerLabel="confriming your verifications"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        >
           <div className="flex items-center w-full justify-center">

            {!success && !error && (
                     <BeatLoader/>
            )}
       
            <FormSuccess message={success}/>

            {!success && (
                 <FormError message={error}/>
            )}
           
           </div>
        </CardWrapper>
    )
}