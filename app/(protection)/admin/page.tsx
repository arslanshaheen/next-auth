"use client"

import { admin } from "@/actions/admin"
import { RoleGate } from "@/components/auth/role-gate"
import { FormSuccess } from "@/components/form.success"
import { Button } from "@/components/ui/button"
// import { useCurrentRole } from "@/hooks/use-current-role"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { UserRole } from "@prisma/client"
import { toast } from "sonner"

const AdminPage = () => {
    const onServerActionClick=()=>{
        admin()
        .then((data)=>{
            if(data.error){
                toast.error(data.error)
            }
            if(data.success){
                toast.success(data.success)
            }
        })
    }
    const onApiRouteClick=()=>{
        fetch("/api/admin")
        .then((response)=>{
            if(response.ok){
                console.log("OKAY")
                toast.success("Allowed Api Route")
            }else{
                console.error('FORBIDDEN')
                toast.error('FORBIDDEN API  error')
            }
        })
    }
    // const role=useCurrentRole()
    return (
        <Card className="w-[600px]">
        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                ✔Admin
            </p>
            <CardContent className="space-y-4">
            <RoleGate allowedRole={UserRole.ADMIN}>

                <FormSuccess
                message="You are allowed to see this content!"
                
                />
            </RoleGate>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Api Route </p>
          <Button onClick={onApiRouteClick}>click to text</Button>

            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action </p>
          <Button onClick={onServerActionClick}>click to text</Button>

            </div>
            </CardContent>
        </CardHeader>
        </Card>
    )
}

export default AdminPage