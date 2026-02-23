"use client"

import { loginWithGoogle } from "@/lib/actions/authActions";

 export const SignInButtonGoogle = () => {

    return (
        <button onClick={() => loginWithGoogle()}>  Sign in with Google </button>
    )
 }