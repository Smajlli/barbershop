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

type bookedServicesType = {
    id: string, 
    service_name: string, 
    service_count: number, 
    user_id: string
}

function Appointments() {
    const [appointments, setAppointments] = useState<appointmentType[]>();
    const [bookedServices, setBookedServices] = useState<bookedServicesType[]>();

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

        async function fetchServices() {
            const supabase = createClient();
            const {data, error} = await supabase.from('booked_services').select('*');
            if(data) setBookedServices(data);
            if(error) console.log(error);
        }
        fetchAppointments();
        fetchServices();
    }, [])

    return <div>
        <h1> Here's appointments for today </h1>
        <div>{appointments?.map((a, i) => (
            <div key={i}>
                <div>{a.fullname}</div>
                <div>{bookedServices?.map((s, i) => (
                    s.user_id === a.user_id ? <div key={i}>{s.service_name}</div> : null
                ))}</div>
            </div>
        ))}</div>
    </div>
}

export default Appointments;