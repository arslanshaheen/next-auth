"user client";

import {
     DropdownMenu,
     DropdownMenuTrigger,
      DropdownMenuContent,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuItem,
    } from "@/components/ui/dropdown-menu"

     import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { ExitIcon } from "@radix-ui/react-icons";

     export const UserButton = () => {
        const user=useCurrentUser()
        return (
          
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={user?.image ||""} />
                        <AvatarFallback className="bg-sky-500"><FaUser className="text-white"/></AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem><ExitIcon className="h-4 w-4 mr-2"/><LogoutButton>logout</LogoutButton></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
     }