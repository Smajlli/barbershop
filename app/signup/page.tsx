'use client'

import { createClient } from "@/app/utils/supabase/client"
import React, { useState, useEffect } from "react"

function Signup() {
    const [fullname, setFullname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFullname(e.target.value);
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSignup = async (formData: FormData) => {

        const supabase = await createClient();

        await supabase.auth.signUp({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            options: {
                data: {
                    fullname,
                    email
                }
            }
        });
    }

    return <div className="w-full h-full flex justify-center items-center flex-col gap-10">
        <h1 className="text-3xl">Sign up</h1>
        <form action={handleSignup} className="flex flex-col item-center gap-8">
            <div className="flex flex-col items-center">
                <label htmlFor="fullname" className="text-xl">Full name:</label>
                <input type="text" id="fullname" name="fullname" placeholder="Enter full name" className="border-solid border-2 border-slate-200 rounded-md" onChange={handleFullname}/>
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="email" className="text-xl">E-mail:</label>
                <input type="text" id="email" name="email" placeholder="Enter email" className="border-solid border-2 border-slate-200 rounded-md" onChange={handleEmail}/>
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="password" className="text-xl">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter password" className="border-solid border-2 border-slate-200 rounded-md" onChange={handlePassword}/>
            </div>
            <button className="boreder-solid bg-purple-400 p-2 rounded-md text-white font-bold">Sign-up</button>
        </form>
    </div>
}

export default Signup;
