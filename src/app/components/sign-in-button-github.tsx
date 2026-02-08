"use client"

import { loginWithGithub } from "@/lib/actions/authActions";

 export const SignInButtonGithub = () => {

    return (
        <button onClick={() => loginWithGithub()}>  Sign in with GitHub </button>
    )
 }; 