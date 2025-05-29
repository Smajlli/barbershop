'use client'

import {useState, useEffect} from "react";
import type { AppointmentType, BookedServicesType } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import AppointmentDetails from "@/app/components/AppointmentDetails";

function Dashboard() {
    const [appointments, setAppointments] = useState<AppointmentType[]>();

    useEffect(() => {
        async function fetchAppointments() {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.user_metadata.role === 'admin') {
                const { data, error } = await supabase.from('appointments').select('*');
                if (data) setAppointments(data)
                if (error) console.log(error.message)
            }
        }
        fetchAppointments();
    }, [])

    return <div>
        <h1>Dashboard</h1>
        <div className="flex flex-col gap-4">
            {appointments?.map((a, i) => (
                <AppointmentDetails appointmentId={a.id} day={a.date.split('/')[1]} month={new Date(a.date).toLocaleString('default', { month: 'long' })} time={a.time} fullname={a.fullname}/>
            ))}
        </div>
    </div>
}

export default Dashboard;