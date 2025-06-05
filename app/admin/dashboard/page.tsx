'use client'

import {useState, useEffect} from "react";
import type { AppointmentType } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import AppointmentDetails from "@/app/components/AppointmentDetails";

function Dashboard() {
    const [appointments, setAppointments] = useState<AppointmentType[]>();
    const [monthFilter, setMonthFilter] = useState<AppointmentType[]>();

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

    const handleMonthFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        
        if(e.target.value === '') {
            setMonthFilter(appointments);
        } else {
            setMonthFilter(appointments?.filter(a => a.date.split('/')[0] === e.target.value));
        }
    }

    return <div>
        <h1>Dashboard</h1>
        <div className="flex flex-col gap-4">
            <div>
                <h1>Filter data by month</h1>
                <select name="month-filter" id="month-filter" onChange={handleMonthFilter}>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                    <option value="">All months</option>
                </select>
            </div>
            {monthFilter ? monthFilter.map((a, i) => (
                <AppointmentDetails key={i} appointmentId={a.id} day={a.date.split('/')[1]} month={new Date(a.date).toLocaleString('default', { month: 'long' })} time={a.time} fullname={a.fullname}/>
            )) : appointments?.map((a, i) => (
                <AppointmentDetails key={i} appointmentId={a.id} day={a.date.split('/')[1]} month={new Date(a.date).toLocaleString('default', { month: 'long' })} time={a.time} fullname={a.fullname}/>
            ))}
        </div>
    </div>
}

export default Dashboard;