export enum AppointmentRoutes {
    USER_FULLNAME='/add/fullname',
    TIME_AND_DATE='/add/timedate',
    TREATMENT='/add/treatment',
    SUMMARY='/add/summary'
}

export type AppointmentType = {
    date: string,
    fullname: string,
    id: string,
    price: number,
    time: string,
    user_id: string
}

export type BookedServicesType = {
    id: string,
    service_name: string,
    service_count: number,
    appointment_id: string
}