'use client'

import { useState } from "react";
import { useAddAppointmentContext } from "../contexts/addAppointmentContext";

function Service(props: {serviceName: string, price: number}) {
    const [serviceCounter, setServiceCounter] = useState(0);
    const {serviceName, price} = props;
    const {updateTreatmentDataDetails} = useAddAppointmentContext();

    const handleServiceCounterSubstract = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(serviceCounter > 0) setServiceCounter(curr => curr - 1)
    }

    const handleServiceCounterAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setServiceCounter(curr => curr + 1);
        updateTreatmentDataDetails({ tretmentName: serviceName, treatmentCount: serviceCounter, treatmentPrice: price })
    }

    return <div className="flex flex-row w-full justify-between">
        <h1>{serviceName}</h1>
        <div className="flex flex-row gap-4 items-center">
            <button onClick={handleServiceCounterSubstract} className="bg-emerald-300 px-3 py-1 text-white font-bold rounded-full">-</button>
            <div>{serviceCounter}</div>
            <button onClick={handleServiceCounterAdd} className="bg-emerald-300 px-3 py-1 text-white font-bold rounded-full">+</button>
        </div>
    </div>
}

export default Service;