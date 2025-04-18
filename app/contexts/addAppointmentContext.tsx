'use client'

import {createContext, useCallback, useContext, useState} from "react"

type AppointmentType = {
    firstname?: string,
    lastname?: string,
    date?: string,
    time?: string
}

type TreatmentType = {
    tretmentName?: string,
    treatmentCount: number,
    treatmentPrice?: number
}

export type {TreatmentType};

const initialAppointmentData: AppointmentType = {
    firstname: '',
    lastname: '',
    date: '',
    time: '',
}

const initialTreatmentData: TreatmentType[] = [
    {
        tretmentName: '',
        treatmentCount: 0,
        treatmentPrice: 0
    }
];

type AddAppointmentContextType = {
    newAppointmentData: AppointmentType;
    newTreatmentData: TreatmentType[];
    updateAppointmentDataDetails: (appointmentDetails: Partial<AppointmentType>) => void;
    updateTreatmentDataDetails: (treatmentDetails: TreatmentType) => void;
}

export const AddAppointmentContext = createContext<AddAppointmentContextType | null>(null);

export const AddAppointmentContextProvider = ({children}: {children: React.ReactNode}) => {
    const [newAppointmentData, setNewAppointmentData] = useState<AppointmentType>(initialAppointmentData);
    const [newTreatmentData, setNewTreatmentData] = useState<TreatmentType[]>(initialTreatmentData)

    const updateAppointmentDataDetails = useCallback((appointmentDetails: Partial<AppointmentType>) => {
        setNewAppointmentData((curr) => ({ ...curr, ...appointmentDetails }))
    }, [newAppointmentData])

    const updateTreatmentDataDetails = useCallback((treatmentDetails: TreatmentType) => {
        setNewTreatmentData((curr) => [...curr, treatmentDetails]);
    }, [newTreatmentData])

    return <AddAppointmentContext.Provider value={{newAppointmentData, updateAppointmentDataDetails, updateTreatmentDataDetails, newTreatmentData}}>
        {children}
    </AddAppointmentContext.Provider>
}

export function useAddAppointmentContext() {
    const context = useContext(AddAppointmentContext);

    if (!context) {
        throw new Error("useAddAppointmentContext must be used within an AddAppointmentContextProvider");
    }

    return context;
}