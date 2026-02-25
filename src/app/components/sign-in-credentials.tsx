"use client";

import { loginWithCredentials } from "@/lib/actions/authActions";
import { useState } from "react";

export const SignInWithCredentials = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button onClick={() => loginWithCredentials(username, password)}> Log in </button>
        </div>
    )};