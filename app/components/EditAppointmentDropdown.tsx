import { createClient } from "../utils/supabase/client";
import { MdDelete } from "react-icons/md";

function EditAppointmentDropdown(props: {id: string}) {
    const {id} = props;

    const handleDelete = async(id: string) => {
        const supabase = createClient();

        const response = await supabase
        .from('appointments')
        .delete()
        .eq('id', id)

        console.log(response);
    }

    return <div className="flex items-center justify-center bg-white rounded-lg p-2 shadow-md text-center absolute top-20 right-5 z-10">
        <div className="flex gap-2 items-center rounded-lg p-2 hover:bg-slate-100 hover:cursor-pointer" onClick={() => handleDelete(id)}>
            <MdDelete className="w-7 h-7 text-red-500" />
            <p className="font-bold">Delete</p>
        </div>
    </div>
}

export default EditAppointmentDropdown;