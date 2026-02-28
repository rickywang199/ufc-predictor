"use client"

import { loginWithGithub } from "@/lib/actions/authActions";
import { FaGithub } from "react-icons/fa6";

 export const SignInButtonGithub = () => {

    return (
       <button onClick={() => loginWithGithub()} className="justify-center flex items-center gap-2 text-base font-bold text-black border border-gray-300 rounded-lg p-2 hover:bg-gray-200 w-full"> <FaGithub></FaGithub> Continue with GitHub </button>
        
    )
 }; 