"use client"

import { registerWithCredentials } from "@/lib/actions/authActions";
import { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { useRouter } from 'next/navigation'



export const RegisterWithCredentials = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleRegister = async() => {
        setError("")
        if (username ===""){
            return setError("Username cannot be empty");
        }
        if (username.length < 3){
            return setError("Username must be at least 3 characters long");
        }
        if (username.length > 20){
            return setError("Username cannot be longer than 20 characters");
        }

        if (email === ""){
            return setError("Email cannot be empty");
        }
        if (!email.includes("@") || !email.includes(".")){
            return setError("Please enter a valid email address");
        }
        if (password === ""){
            return setError("Password cannot be empty");
        }
        if (password.length < 6){
            return setError("Password must be at least 6 characters long");
        }
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        const result = await registerWithCredentials(username, password, email);
        if (result.error){
            setError(result.error);
        }
        if (result.success){
            setSuccess("Account created successfully! Redirecting to login page...")
            setTimeout(() => {
                router.push("/")
            }, 3000);
        }
    }

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
                    {success && <div className="text-green-500 text-sm mb-3">{success}</div>}
                    <button className="justify-center flex items-center gap-3 text-base font-bold text-white border border-gray-300 rounded-lg p-2 hover:bg-teal-700 w-full bg-teal-600"  
                            onClick={handleRegister}> Create account <MdArrowForward></MdArrowForward> </button>
                </div>
    )
};