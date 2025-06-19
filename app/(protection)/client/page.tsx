"use client"

import { UserInfo } from "@/components/user-info";

import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
    const user=useCurrentUser();
    return (
        <div>
           {/* {JSON.stringify(user)} */}
           <UserInfo
           label="client components"
           user={user}
           
           />
        </div>
    )
}

export default ClientPage