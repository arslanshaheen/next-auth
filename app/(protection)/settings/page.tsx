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
import { Switch } from "@/components/ui/switch";
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
  FormMessage,
  FormDescription
  
} from   "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import * as z from "zod";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form.success";
import { UserRole } from "@prisma/client";


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
    email:user?.email || undefined,
    role:user?.role || undefined
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


                {user?.isOAuth === false && (
                <>
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
                    <FormMessage/>
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
                    <FormMessage/>
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="newPassword"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>NewPassword</FormLabel>
                    <FormControl>
                      <Input
                      {...field}
                      placeholder="new password"
                      disabled={isPending}
                      type="newPassword"
                      />
                    </FormControl>
                    <FormMessage/>
                    </FormItem>
                )}
                />
                </>
                )}
                <FormField
                control={form.control}
                name="role"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>
                          Admin
                          </SelectItem>
                          <SelectItem value={UserRole.USER}>
                          User
                          </SelectItem>
                      </SelectContent>

                    </Select>
                    <FormMessage/>
                    </FormItem>
                )}
                />
        {user?.isOAuth ===
        false && (
          
          <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({field})=>(
                  <FormItem className="flex flex-row items-center justify-between
                   rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                    <FormLabel>Two Factor Authentication</FormLabel>
                    <FormDescription>
                      Enabled two factor authentications for your accounts
                    </FormDescription>
                    </div>
                    <FormControl>
                      <Switch 
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    </FormItem>
                )}
                />
          
        )}
                 
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