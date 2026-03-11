"use client";

import { loginWithCredentials } from "@/lib/actions/authActions";
import { useState } from "react";
import { MdArrowForward } from "react-icons/md";


export const SignInWithCredentials = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="flex flex-col text-black placeholder-gray-500">
            <div className="text-sm font-bold mb-2">Username</div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="border border-gray-100 bg-gray-100 rounded-lg p-2 mb-5"/>
            <div className="text-sm font-bold mb-2">Password</div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" type="password"  className="border border-gray-100 bg-gray-100 rounded-lg p-2 mb-7"/>
            <button onClick={() => loginWithCredentials(username, password)} className="justify-center flex items-center gap-3 text-base font-bold text-white border border-gray-300 rounded-lg p-2 hover:bg-teal-700 w-full bg-teal-600"> Sign in <MdArrowForward></MdArrowForward> </button>
        </div>
    )
};