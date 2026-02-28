"use client"

import { loginWithGoogle } from "@/lib/actions/authActions";
import { FaGoogle } from "react-icons/fa6";

 export const SignInButtonGoogle = () => {

    return (
        <button onClick={() => loginWithGoogle()} className="justify-center flex items-center gap-2 text-base font-bold text-black border border-gray-300 rounded-lg p-2 hover:bg-gray-200 w-full"><FaGoogle></FaGoogle>  Continue with Google </button>
    )
 }