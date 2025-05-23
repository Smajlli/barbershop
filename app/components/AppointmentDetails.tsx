'use client'

import {useState, useEffect} from "react";
import type { AppointmentType, BookedServicesType } from "@/app/types";
import { createClient } from "@/app/utils/supabase/client";
import { IoMdTime, IoIosArrowDropdownCircle } from "react-icons/io";
import EditAppointmentDropdown from "@/app/components/EditAppointmentDropdown";

function AppointmentDetails(props: {appointmentId: string, day: string, month: string, time: string, fullname: string}) {
    const {appointmentId, day, month, time, fullname} = props;
    const [bookedServices, setBookedServices] = useState<BookedServicesType[]>();
    const [dropdown, setDropdown] = useState<boolean>(false);

    useEffect(() => {
        async function fetchServices() {
            const supabase = createClient();
            const { data, error } = await supabase.from('booked_services').select('*');
            if (data) setBookedServices(data);
            if (error) console.log(error);
        }

        fetchServices();
    }, [])

    const handleDropdown = () => {
        setDropdown(!dropdown);
    }

    return <>
        <div className="w-full flex flex-col md:flex-row items-center bg-slate-50 gap-2 rounded-lg p-4 shadow-sm relative">
            <div className="flex flex-col w-1/6 h-full text-center p-4 bg-white rounded-md items-center">
                <div className="text-md font-bold">{day}th</div>
                <div className="text-4xl text-emerald-400">{month}</div>
            </div>
            <div className="flex flex row items-center gap-1">
                <IoMdTime className="h-6 w-6" />
                <div className="text-lg">{time}</div>
            </div>
            <div className="w-full h-full text-center font-semibold">{fullname}</div>
            <div className="w-full h-full flex flex-col items-center md:items-start">
                <div className="text-slate-600 font-semibold">Booked services:</div>
                <div className="w-full flex flex-col lg:flex-row items-center">
                    {bookedServices?.map((s, i) => (
                        s.appointment_id === appointmentId ? <div key={i} className="w-full h-full text-center md:text-left ">{s.service_name}</div> : null
                    ))}
                </div>
            </div>
            <IoIosArrowDropdownCircle className="w-16 h-16 text-slate-700 hover:cursor-pointer" onClick={handleDropdown}/>
            {dropdown ? <EditAppointmentDropdown id={appointmentId}/> : null}
        </div>
    </>
}

export default AppointmentDetails;