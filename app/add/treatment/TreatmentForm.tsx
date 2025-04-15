'use client'

import { useState } from "react";
import Service from "@/app/components/Service"
import NextButton from "@/app/components/NextButton";

type ServiceType = {
    service: string,
    price: number
}

const services: ServiceType[] = [
    {service: 'Fade Haircut', price: 15},
    {service: 'Eyebrows', price: 2},
    {service: 'Hair Line', price: 1},
    {service: 'Hair Wash', price: 3},
    {service: 'Beard Lineup', price: 5},
    {service: 'Beard Dyeing', price: 15},
    {service: 'Vax', price: 10},
    {service: 'Hair Line', price: 1},
]

function TreatmentForm() {
    return <div className="flex flex-col gap-4 w-full">
        {services.map((s, index) => {
            return <Service key={index} serviceName={s.service} price={s.price}/>
        })}
        <NextButton route="/add/summary" />
    </div>
}

export default TreatmentForm;