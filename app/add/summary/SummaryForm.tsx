import { useAddAppointmentContext } from "@/app/contexts/addAppointmentContext";
import { filterTreatments } from "@/app/helpers/filterServices";
import { calculatePrice } from "@/app/helpers/calculatePrice";

import React from "react";

function SummaryForm() {
    const {newAppointmentData, newTreatmentData} = useAddAppointmentContext();
    const filteredData = filterTreatments(newTreatmentData);
    const price = calculatePrice(newTreatmentData);

    return <div>
        <h1>Here's your summary:</h1>
        <p>Name: {newAppointmentData.firstname}</p>
        <p>Last name: {newAppointmentData.lastname}</p>
        <p>Date: {newAppointmentData.date}</p>
        <p>Time: {newAppointmentData.time}</p>
        <div>Treatment: {filteredData.map((t, index) => (
            t.tretmentName ? <div key={index}>{t.tretmentName}, {t.treatmentCount + 1}X</div> : null
        ))}</div>
        <div>Price: {price} BAM</div>
    </div>
}

export default SummaryForm;
