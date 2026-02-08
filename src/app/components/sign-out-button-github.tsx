"use client"

import { logoutWithGithub } from "@/lib/actions/authActions";

 export const SignOutButtonGithub = () => {

    return (
        <button onClick={() => logoutWithGithub()}>  Sign out </button>
    )
 }; 