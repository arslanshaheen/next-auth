
"use client";
import {useState,  useTransition } from 'react';
import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schemas";
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
import {login} from "@/actions/login";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";


export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl=searchParams.get("callbackUrl")
   const urlError = searchParams.get("error")==="OAuthAccountNotLinked" ? "email is already linked with different provider" 
   : "";

    const [showTwoFactor, setShowTwoFactor]=useState(false)
   const [error, setError] = useState<string|undefined>("");
    const [success, setSuccess] = useState<string|undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:"",
        },
    })




const onSubmit = (values:z.infer<typeof LoginSchema>)=>{
    setError("");
    setSuccess("");


    startTransition(()=>{
        login(values, callbackUrl)
        .then((data)=>{
            // setError(data.error );
            // //todo : add when we add 2FA
            // setSuccess(data?.success )
            if(data?.error){
                form.reset();
                  setError(data.error );
            }

            if(data?.success){
                form.reset();
                  setSuccess(data.success );
            }

            if(data?.twoFactor){
                setShowTwoFactor(true);
            }
        })
        .catch(()=>setError("something went wrong"))
    })
    
}


    return (
        <CardWrapper
        headerLabel="welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
        >
            <Form {...form}>
                <form
                 onSubmit={form.handleSubmit(onSubmit)}
                   className="space-y-2" 
                    >
                    <div className="space-y-4">

                        {showTwoFactor && (
                            <FormField
                            control={form.control}
                            name="code"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>two factor code</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                        disabled={isPending}
                                        placeholder="123456"
                                      />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            >
    
                            </FormField>
                        )}
                    {!showTwoFactor && (
                        <>
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
                        <FormField
                        control={form.control}
                        disabled={isPending}
                        name="password"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    placeholder="******"
                                    type="password" />
                                </FormControl>
                                <Button
                                size="sm"
                                variant='link'
                                asChild
                                className='px-0 font-normal'
                                >
                                    <Link href="/auth/reset">
                                    Forgot password?
                                    </Link>
                    
                                </Button>
                                <FormMessage/>
                            </FormItem>
                        )}
                        
                        />
                        </>
                        )}

                        
                        

                    </div>
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full"


                    >
                        {showTwoFactor ? "confirm":"login"}
                    </Button>
                        </form>
                    
             
                <FormControl></FormControl>
                
            </Form>
           
        </CardWrapper>
    )
}