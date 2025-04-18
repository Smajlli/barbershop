'use client'

import React from "react";
import { useAddAppointmentContext } from "@/app/contexts/addAppointmentContext";
import NextButton from "@/app/components/NextButton";

function FullNameForm() {
    const {updateAppointmentDataDetails, newAppointmentData} = useAddAppointmentContext();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateAppointmentDataDetails({[e.target.name] : e.target.value});
    } 

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        console.log(newAppointmentData);
    }

    return <>
        <form className="w-1/2 mx-auto">
            <div className="mb-5">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name: </label>
                <input type="text" id="firstName" name="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full p-2.5" placeholder="Your name" onChange={handleInputChange} defaultValue={newAppointmentData['firstname']}/>
            </div>
            <div className="mb-5">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name: </label>
                <input type="text" id="lastName" name="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full p-2.5" placeholder="Your last name" onChange={handleInputChange}/>
            </div>
        </form>
        <NextButton route="/add/timedate"/>
    </>
}

export default FullNameForm;