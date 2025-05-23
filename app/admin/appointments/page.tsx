'use client'

import { createClient } from "@/app/utils/supabase/client";
import { useState, useEffect } from "react";
import { IoMdTime } from "react-icons/io";
import type { AppointmentType, BookedServicesType } from "@/app/types";

function Appointments() {
    const [appointments, setAppointments] = useState<AppointmentType[]>();
    const [bookedServices, setBookedServices] = useState<BookedServicesType[]>();
    const date = new Date().getDate();
    const today = new Date().toLocaleDateString();
    const month = new Date().toLocaleString('default', {month: 'long'});
    
    useEffect(() => {
        async function fetchAppointments() {
            const supabase = createClient();
            const {data: {user}} = await supabase.auth.getUser();
            if(user?.user_metadata.role === 'admin') {
                const { data, error } = await supabase.from('appointments').select('*').eq('date', today);
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
        <h1 className="text-4xl"> Appointments </h1>
        <p className="text-slate-600">See your scheduled appointments below.</p>
        <div className="flex flex-col gap-4">{appointments?.map((a, i) => (
            <div key={i} className="w-full flex flex-col md:flex-row items-center bg-slate-50 gap-2 rounded-lg p-4 shadow-sm">
                <div className="flex flex-col w-1/6 h-full text-center p-4 bg-white rounded-md items-center">
                    <div className="text-md font-bold">{date}th</div>
                    <div className="text-4xl text-emerald-400">{month}</div>
                </div>
                <span className="w-px h-full border-2 border-solid"></span>
                <div className="flex flex row items-center gap-1">
                    <IoMdTime className="h-6 w-6"/>
                    <div className="text-lg">{a.time}</div>
                </div>
                <div className="w-full h-full text-center font-semibold">{a.fullname}</div>
                <div className="w-full h-full flex flex-col items-center md:items-start">
                    <div className="text-slate-600 font-semibold">Booked services:</div>
                    <div className="w-full flex flex-col lg:flex-row items-center">
                        {bookedServices?.map((s, i) => (
                            s.appointment_id === a.id ? <div key={i} className="w-full h-full text-center md:text-left ">{s.service_name}</div> : null
                        ))}
                    </div>
                </div>
            </div>
        ))}</div>
    </div>
}

export default Appointments;