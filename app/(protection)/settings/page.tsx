// "use client"


// //method1
// // import {auth, signOut} from "@/auth";
// ;
// // import { useSession ,signOut} from "next-auth/react";

// //method2
// // import { logout } from "@/actions/logout";
// // import { useCurrentUser } from "@/hooks/use-current-user"
// const SettingsPage = () => {


//   //method1
//     // const session = await auth();
//     // const session=useSession()

//     //method2
//     // const user=useCurrentUser()


//     // const onClick=()=>{
//     //   // signOut()
//     //   logout()
//     // }



//     return (
//         <div className="bg-white p-10 rounded-xl">
//           {/* {JSON.stringify(user)} */}
//           <button onClick={onClick} type="submit">Sign Out</button>
//           {/* <form action={async () => {
//             "use server";
//             await signOut({ 
//               redirectTo: "/auth/login" 
//             });
//           }}> */}
//           {/* <form>
//             <button type="submit">Sign Out</button>
//           </form> */}
         
//         </div>
//     );
// }

// export default SettingsPage;






"use client"
import { useTransition,useState } from "react";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import { 
Card,
CardHeader,
CardContent
} from "@/components/ui/card"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  
} from   "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import * as z from "zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form.success";

const SettingsPage = () => {
  const user=useCurrentUser()
  const [error ,setError]=useState<string | undefined>();
  const [success ,setSuccess]=useState<string | undefined>();
  const {update}=useSession()
const [isPending, startTransition]=useTransition()

const form = useForm<z.infer<typeof SettingsSchema>>({
  resolver:zodResolver(SettingsSchema),
  defaultValues:{
    password:undefined,
    newPassword:undefined,
    name:user?.name || undefined,
    email:user?.email || undefined
  }
})

  const onSubmit=(values:z.infer<typeof SettingsSchema>)=>{
    startTransition(()=>{
      settings(values)
        .then((data)=>{
            if(data.error){
              setError(data.error)
            }


            if(data.success){
              update()
              setSuccess(data.success)
            }
        })
        .catch(()=>setError("something went wrong"))

        
    })
    
  }

return (
        <Card className="w-[600px]">
          <CardHeader>
            <p className="text-2xl font-semibold text-center">
              🔅settings
            </p>
          </CardHeader>
          <CardContent>

           <Form {...form}>
              <form className="space-y-6" 
              onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                <FormField
                control={form.control}
                name="name"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                      {...field}
                      placeholder="arsloo"
                      disabled={isPending}
                      />
                    </FormControl>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                      {...field}
                      placeholder="arsloo@gmail.com"
                      type="email"
                      disabled={isPending}
                      />
                    </FormControl>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                      {...field}
                      placeholder="******"
                      disabled={isPending}
                      type="password"
                      />
                    </FormControl>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="newPassword"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                      {...field}
                      placeholder="new password"
                      disabled={isPending}
                      type="newPassword"
                      />
                    </FormControl>
                    </FormItem>
                )}
                />
                </div>
                <FormSuccess message={success}/>
                <FormError message={error}/>
              <Button
              disabled={isPending}
              type="submit"
              >save</Button>
                
              </form>
           </Form>
          </CardContent>

        </Card>
    );
}

export default SettingsPage;