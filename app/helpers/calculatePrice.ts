import type { TreatmentType } from "@/app/contexts/addAppointmentContext";

export function calculatePrice(arr: TreatmentType[]) {
    let price = 0;
    arr.map((t) => {
        if(t.treatmentPrice !== undefined) {
            price = price + t.treatmentPrice;
        }
    })
    return price;
}