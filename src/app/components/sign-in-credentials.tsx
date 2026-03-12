"use client";

import { loginWithCredentials } from "@/lib/actions/authActions";
import { useState } from "react";
import { MdArrowForward } from "react-icons/md";


export const SignInWithCredentials = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async () => {
        if (username ===""){
            return setError("Please enter your Username");
        }
        if (password === ""){
            return setError("Please enter your Password");
        }
        const result = await loginWithCredentials(username,password);
        if (result.error){
            setError(result.error);
        }
    }
    return (
        <div className="flex flex-col text-black placeholder-gray-500">

            <div className="text-sm font-bold mb-2">Username</div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="border-2 border-gray-600 bg-gray-100 rounded-lg p-2 mb-5"/>

            <div className="text-sm font-bold mb-2">Password</div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" type="password"  className="border-2 border-gray-600 bg-gray-100 rounded-lg p-2 mb-7"/>
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            <button onClick={handleLogin} className="justify-center flex items-center gap-3 text-base font-bold text-white border border-gray-300 rounded-lg p-2 hover:bg-[#FF0000] w-full bg-[#800000]"> Sign in <MdArrowForward></MdArrowForward> </button>
        </div>
    )
};