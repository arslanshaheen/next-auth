
"use client";
import {useState,  useTransition } from 'react';
import { CardWrapper } from "@/components/auth/card-wrapper";
import { ResetSchema } from "@/schemas";
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form.success";
import {reset} from "@/actions/reset";




export const ResetForm = () => {
  const [error, setError] = useState<string|undefined>("");
    const [success, setSuccess] = useState<string|undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver:zodResolver(ResetSchema),
        defaultValues:{
            email:""
          
        },
    })




const onSubmit = (values:z.infer<typeof ResetSchema>)=>{
    setError("");
    setSuccess("");


    // console.log(values);

    startTransition(()=>{
        reset(values)
        .then((data)=>{
            setError(data.error );
            //todo : add when we add 2FA
            setSuccess(data?.success )
        })
    })
    
}


    return (
        <CardWrapper
        headerLabel="forget your password?"
        backButtonLabel="back to login?"
        backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                 onSubmit={form.handleSubmit(onSubmit)}
                   className="space-y-2" 
                    >
                    <div className="space-y-4">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    disabled={isPending}
                                    placeholder="arslan@example.com"
                                    type="email" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        >

                        </FormField>
                       
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full"


                    >
                        send reset email 
                    </Button>
                        </form>
                    
             
                <FormControl></FormControl>
                
            </Form>
           
        </CardWrapper>
    )
}