import type { TreatmentType } from "../contexts/addAppointmentContext";

function checkForHighestCount(obj: TreatmentType, arr: TreatmentType[]) {
    const highestCountObject = arr
    .filter(treatment => treatment.tretmentName === obj.tretmentName)
    .reduce((treatment, highest) => (
        treatment.treatmentCount > highest.treatmentCount ? treatment : highest
    ), obj)
    return highestCountObject;
}

export function filterTreatments(treatments: TreatmentType[]) {
    const filteredTreatments: TreatmentType[] = [];

    treatments.map((t) => {
        const filteredObject = checkForHighestCount(t, treatments);
        if(!filteredTreatments.includes(filteredObject)) {
            filteredTreatments.push(filteredObject);
        }
    })

    return filteredTreatments;
}

