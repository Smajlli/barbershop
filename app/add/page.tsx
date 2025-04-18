import {redirect} from "next/navigation"
import { AppointmentRoutes } from "@/app/types"

function AddAppointmentPage() {
    redirect(AppointmentRoutes.USER_FULLNAME)
}

export default AddAppointmentPage;