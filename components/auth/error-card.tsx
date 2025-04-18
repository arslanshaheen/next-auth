
import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


export const ErrorCard =()=>{
    return(

        <CardWrapper
        headerLabel="opps something went wrong!"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        >

            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
       
    )
}