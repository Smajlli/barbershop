import StepNavigation from "@/app/components/StepNavigation";
import { AddAppointmentContextProvider } from "../contexts/addAppointmentContext";

function AppointmentLayout({children,} : {children: React.ReactNode;}) {
    return(
        <div className="w-screen h-full px:2 lg:px-0">
           <div className="flex flex-col gap-2 ml-10">
                <h1 className="text-3xl font-bold">Make your appointment</h1>
                <p className="text-sm ">Create your own appointment for your haircut just in three steps</p>
           </div>
           <span className="w-5/6 h-full border-b border-slate-400 block text-center"></span>
            <div className="flex flex-col lg:flex-row w-full h-full items-center justify-evenly">
                <StepNavigation/>
                <AddAppointmentContextProvider>
                    <div className="mt-20 mb-28 flex flex-col gap-x-16 lg:flex-row w-80 grow">
                        <div className="w-full h-full flex flex-col justify-center items-center ">{children}</div>
                    </div>
                </AddAppointmentContextProvider>
            </div>
        </div>
    );
}

export default AppointmentLayout;