"use client"

import { loginWithGoogle } from "@/lib/actions/authActions";
import { FaGoogle } from "react-icons/fa6";

 export const SignInButtonGoogle = () => {

    return (
        <button onClick={() => loginWithGoogle()} className="justify-center flex items-center gap-2 text-base font-bold text-black p-2 hover:bg-gray-200 border-2 border-gray-600 bg-white rounded-lg w-full"><FaGoogle></FaGoogle>  Continue with Google </button>
    )
 }