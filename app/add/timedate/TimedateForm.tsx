'use client'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import "react-datepicker/dist/react-datepicker-cssmodules.css"
import { useState } from "react";
import { useAddAppointmentContext} from "@/app/contexts/addAppointmentContext";
import NextButton from "@/app/components/NextButton";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/styles/datepicker.css"

function TimeDate() {
    const {updateAppointmentDataDetails} = useAddAppointmentContext();
    const [date, setDate] = useState(new Date())
    const [day, setDay] = useState<string>('');
    const [isDaySelected, setIsDaySelected] = useState<boolean>(false);

    const handleDate = (value: any) => {
        updateAppointmentDataDetails({date: value.toLocaleString().split(',')[0]});
        setDate(value);
        setDay(value.toString().split(' ')[0]);
        setIsDaySelected(!isDaySelected);
    }

    const handleTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateAppointmentDataDetails({time: e.target.value})
    }

    return <>
        <form className="flex flex-col gap-10">
            <div className="h-1/2">
                <DatePicker className="react-datepicker" selected={date} onChange={handleDate} placeholderText="Select date" minDate={new Date()}/>
            </div>
            {isDaySelected && day !== 'Sat' ? <div>
                <label htmlFor="time" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Choose a time:</label>
                <select name="time" id="time" onChange={handleTime} className="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full p-2.5">
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                </select>
            </div> : <div>
                <label htmlFor="time" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Choose a time:</label>
                <select name="time" id="time" onChange={handleTime} className="bg-gray-50 border border-emerald-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-400 focus:border-emerald-400 block w-full p-2.5">
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="12:00">12:00</option>
                    <option value="12:30">12:30</option>
                    <option value="13:00">13:00</option>
                    <option value="13:30">13:30</option>
                </select>
            </div>}
        </form>
        <NextButton route="/add/treatment"/>
    </>;
}

export default TimeDate;