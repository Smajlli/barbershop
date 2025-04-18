import TreatmentForm from "@/app/add/treatment/TreatmentForm"

function Treatment() {
    return <div className="w-full">
        <h1>What would you like ?</h1>
        <div className="flex flex-col gap-4">
            <TreatmentForm/>
        </div>
    </div>
}
export default Treatment;