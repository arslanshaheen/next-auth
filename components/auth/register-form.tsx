
"use client";
import {useState,  useTransition } from 'react';
import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterSchema } from "@/schemas";
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
import {register} from "@/actions/register";


export const RegisterForm = () => {
    const [error, setError] = useState<string|undefined>("");
    const [success, setSuccess] = useState<string|undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
        },
    })




const onSubmit = (values:z.infer<typeof RegisterSchema>)=>{
    setError("");
    setSuccess("");


    startTransition(()=>{
        register(values)
        .then((data)=>{
            setError(data.error );
            setSuccess(data.success )
        })
    })
    
}


    return (
        <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="back to login"
        backButtonHref="/auth/login"
        showSocial
        >
            <Form {...form}>
                <form
                 onSubmit={form.handleSubmit(onSubmit)}
                   className="space-y-2" 
                    >
                    <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                    disabled={isPending}
                                    placeholder="name"
                                    type="name" />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        >
                       </FormField>
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
                        create new account
                    </Button>
                        </form>
                    
             
                <FormControl></FormControl>
                
            </Form>
           
        </CardWrapper>
    )
}