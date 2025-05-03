'use client'

import { createClient } from "@/app/utils/supabase/client";
import { useState, useEffect } from "react";

type appointmentType = {
    date?: string,
    fullname?: string, 
    id?: string, 
    price?: number,
    time?: string, 
    user_id?: string
}

function Appointments() {
    const [appointments, setAppointments] = useState<appointmentType[]>();

    useEffect(() => {
        async function fetchAppointments() {
            const supabase = createClient();
            const {data: {user}} = await supabase.auth.getUser();
            if(user?.user_metadata.role === 'admin') {
                const { data, error } = await supabase.from('appointments').select();
                if (data) setAppointments(data)
                if (error) console.log(error.message)
            }
        }
        fetchAppointments();
    }, [])

    return <div>
        <h1> Here's appointments for today </h1>
        <div>{appointments?.map((a) => (
            <div> {a.fullname} </div>
        ))}</div>
    </div>
}

export default Appointments;