"use client"
import {loginWithEmail} from "@/lib/actions/authActions";
import{ useState } from "react";


export const SignInButtonEmail = () => {
    const [email, setEmail] = useState("");
    return (
        <div>  
            <input type = "email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
            <button onClick={() => loginWithEmail(email)}> Sign in with Email </button>
        </div>
        

    )
}
