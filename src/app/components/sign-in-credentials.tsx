"use client";

import { loginWithCredentials } from "@/lib/actions/authActions";
import { useState } from "react";


export const SignInWithCredentials = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="flex flex-col text-black placeholder-gray-500">
            <div className="text-sm font-bold mb-2">Username</div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="border border-gray-100 bg-gray-100 rounded-lg p-2 mb-5"/>
            <div className="text-sm font-bold mb-2">Password</div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"  className="border border-gray-100 bg-gray-100 rounded-lg p-2 mb-7"/>
            <button onClick={() => loginWithCredentials(username, password)}> Log in </button>
        </div>
    )};