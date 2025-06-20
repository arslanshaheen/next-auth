"use client"

//use in login-form 
import {Header} from "@/components/auth/header";
import {Soical} from "@/components/auth/social";
import {BackButton} from "@/components/auth/back-button";
import {
     Card,
     CardContent,
     CardFooter,
     CardHeader,
  

} from "@/components/ui/card";


interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
  showSocial?:boolean;

};


export const  CardWrapper = ({children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
}:CardWrapperProps)=>{

    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                       <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
            {showSocial &&  (
                <CardFooter>
                    <Soical/>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                label={backButtonLabel}
                href={backButtonHref}
                />  
                
            </CardFooter>

        </Card>
            
       
    )

}