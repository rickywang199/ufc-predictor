"use client"

import { registerWithCredentials } from "@/lib/actions/authActions";
import { useState } from "react";
import { MdArrowForward } from "react-icons/md";



export const RegisterWithCredentials = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    return(
        <div className="flex flex-col text-black placeholder-gray-500">
                    <div className="text-sm font-bold">Username</div>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Choose your username" className="border border-gray-100 bg-gray-100 rounded-lg p-2 mb-3"/>
                    <div className="text-sm font-bold mb-2">Email</div>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com" className="border border-gray-100 bg-gray-100 rounded-lg p-2 mb-3"/>
                    <div className="text-sm font-bold mb-2">Password</div>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create your password" type="password"  className="border border-gray-100 bg-gray-100 rounded-lg p-2 mb-3"/>
                    <div className="text-sm font-bold mb-2">Confirm Password</div>
                    <input value= {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" type="password"  className="border border-gray-100 bg-gray-100 rounded-lg p-2 mb-5"/>
                    {error && <div className="text-red-500 text-sm mb-3">{error}</div>}    
                    <button className="justify-center flex items-center gap-3 text-base font-bold text-white border border-gray-300 rounded-lg p-2 hover:bg-teal-700 w-full bg-teal-600"  
                            onClick={() => {setError("")
                                            if (password === confirmPassword) {
                                                registerWithCredentials(username, password, email)}
                                            else{
                                                setError("Passwords do not match")}
                                            }}> Create account <MdArrowForward></MdArrowForward> </button>
                </div>
    )
};