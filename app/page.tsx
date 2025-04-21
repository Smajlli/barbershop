'use client'

import React from "react";
import { createClient } from "./utils/supabase/client";

export default function Home() {

  const logout = async() => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut()

    if(error) console.log(error);
  }

  return <div className="w-screen h-screen flex items-center justify-center flex-col gap-4">
    <h1 className="text-4xl">Wellcome to barbershop app</h1>
    <button type="button" className="bg-emerald-300 rounded-xl px-3 py-2 text-white">Book your appointment</button>
    <button type="button" className="bg-emerald-300 rounded-xl px-3 py-2 text-white" onClick={logout}>Sign out</button>
  </div>
}
