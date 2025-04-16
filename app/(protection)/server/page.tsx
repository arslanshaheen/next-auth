import { currentUser } from "@/lib/currentUser";
import { UserInfo } from "@/components/user-info";
const ServerPage = async() => {
    const user=await currentUser();
    return (
        <div>
           {/* {JSON.stringify(user)} */}
           <UserInfo label="༼ つ ◕_◕ ༽つServer components"
           user={user}
           
           />
        </div>
    )
}

export default ServerPage