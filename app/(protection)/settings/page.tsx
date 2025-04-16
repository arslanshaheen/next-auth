"use client"

// import {auth, signOut} from "@/auth";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { useSession ,signOut} from "next-auth/react";

const SettingsPage = () => {
    // const session = await auth();
    // const session=useSession()
    const user=useCurrentUser()


    const onClick=()=>{
      // signOut()
      logout()
    }

    return (
        <div className="bg-white p-10 rounded-xl">
          {/* {JSON.stringify(user)} */}
          <button onClick={onClick} type="submit">Sign Out</button>
          {/* <form action={async () => {
            "use server";
            await signOut({ 
              redirectTo: "/auth/login" 
            });
          }}> */}
          {/* <form>
            <button type="submit">Sign Out</button>
          </form> */}
         
        </div>
    );
}

export default SettingsPage;