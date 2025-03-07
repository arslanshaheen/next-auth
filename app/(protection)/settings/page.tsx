import {auth, signOut} from "@/auth";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
    const session = await auth();


    
    if (!session) {
        redirect("/auth/login");
    }

    return (
        <div>
          {JSON.stringify(session)}

          <form action={async () => {
            "use server";
            await signOut({ 
              redirectTo: "/auth/login" 
            });
          }}>
            <button type="submit">Sign Out</button>
          </form>
        </div>
    );
}

export default SettingsPage;