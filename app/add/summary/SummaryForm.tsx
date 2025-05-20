import { useAddAppointmentContext } from "@/app/contexts/addAppointmentContext";
import { filterTreatments } from "@/app/helpers/filterServices";
import { calculatePrice } from "@/app/helpers/calculatePrice";
import { FaUser } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";
import { createClient } from "@/app/utils/supabase/client";
import {v4 as uuid} from 'uuid';

import React from "react";

function SummaryForm() {
    const {newAppointmentData, newTreatmentData} = useAddAppointmentContext();
    const filteredData = filterTreatments(newTreatmentData);
    const price = calculatePrice(newTreatmentData);
    const appointmentId = uuid();
    console.log(appointmentId);

    const supabase = createClient();

    const handleAppointmentData = async() => {

        const { error } = await supabase
        .from('appointments')
        .insert({id: appointmentId, fullname: `${newAppointmentData.firstname} ${newAppointmentData.lastname}`, date: newAppointmentData.date, time: newAppointmentData.time, price});

        if(error) console.log(error);
    }

    const handleTreatmentData = () => {

        filteredData.map(async(t) => {
            if(t.tretmentName !== '') {
                const { error } = await supabase
                    .from('booked_services')
                    .insert({ service_name: t.tretmentName, service_count: t.treatmentCount + 1, appointment_id: appointmentId });

                if (error) console.log(error); 
            }
        })
    }

    const handleData = async() => {
        handleAppointmentData();
        const {data} = await supabase.from('appointments').select('id');
        await new Promise(resolve => setTimeout(resolve, 5000));
        if(data) handleTreatmentData();
    }

    return <div className="w-full h-full md:w-1/2 bg-white border rounded-md drop-shadow-md p-8 divide-y">
        <div className="flex flex-row gap-4 p-3"><FaUser className="text-emerald-400 h-12 h-5 w-5"/> {newAppointmentData.firstname} {newAppointmentData.lastname}</div>
        <div className="flex flex-row gap-4 p-3"><IoMdTime className="text-emerald-400 h-12 h-5 w-5"/> {newAppointmentData.time}</div>
        <div className="flex flex-row gap-4 p-3"><MdDateRange className="text-emerald-400 h-12 h-5 w-5"/> {newAppointmentData.date}</div>
        <div className="p-3 flex flex-col gap-2">
            <h1 className="uppercase text-xs font-bold text-emerald-400">Services Booked</h1>
            <div>
                {filteredData.map((t) => (
                    t.tretmentName ? <div className="flex flex-row gap-4 w-full">
                        <FaPlus className="text-emerald-400 h-12 h-5 w-5" />
                        <h1>{t.tretmentName ? t.tretmentName : null}</h1>
                        <div>{t.treatmentCount + 1}X</div>
                    </div> : null
                ))}
            </div>
        </div>
        <div>
            <div className="flex flex-row gap-4 p-3"><MdCreditCard className="text-emerald-400 h-12 h-5 w-5" /> {price} BAM</div>
            <button className="bg-emerald-400 text-white font-bold border rounded-md p-2 text-sm text-center" onClick={handleData}>Done</button>
        </div>
    </div>
}

export default SummaryForm;
