'use client'

import { createClient } from "@/app/utils/supabase/client";
import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        const supabase = createClient();

        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password
        })
    }

    return <div className="w-full h-full flex flex-col justify-center items-center gap-10">
        <h1 className="text-3xl">Login</h1>
        <form action={handleLogin} className="flex flex-col item-center gap-8">
            <div className="flex flex-col items-center">
            <label htmlFor="email" className="text-2xl">E-mail:</label>
            <input type="text" id="email" name="email" placeholder="Enter e-mail" onChange={handleEmail} className="border-solid border-2 border-slate-200 rounded-md"/>
        </div>
        <div className="flex flex-col items-center">
            <label htmlFor="password" className="text-2xl">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter passord" onChange={handlePassword} className="border-solid border-2 border-slate-200 rounded-md"/>
        </div>
        <button className="boreder-solid bg-purple-400 p-2 rounded-md text-white font-bold">Sign in</button>
        </form>
    </div>
}

export default Login;