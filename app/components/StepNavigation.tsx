'use client'

import {AppointmentRoutes} from "@/app/types"
import Link from "next/link"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import path from "path"

type StepType = {
    name: string,
    route: string,
    path: string
}

const steps: StepType[] = [
    {name: 'Full Name', route: 'fullname',path: AppointmentRoutes.USER_FULLNAME},
    {name: 'Time and Date', route: 'timedate',path: AppointmentRoutes.TIME_AND_DATE},
    {name: 'Services', route: 'treatment',path: AppointmentRoutes.TREATMENT},
    {name: 'Summary', route: 'summary',path: AppointmentRoutes.SUMMARY},
]

function StepNavigation() {
    const [currentStep, setCurrentStep] = useState(1);
    const pathname = usePathname();
    const currentPathname = path.basename(pathname);

    useEffect(() => {
        setCurrentStep(steps.findIndex((step) => step.route === currentPathname));
    }, [currentPathname])

    return(
        <div className="w-full lg:w-60 mb-12 mt-4 lg:mb-0">
            <div className="relative flex flex-row justify-evenly items-center lg:flex-col lg:justify-start lg:gap-8">
                {steps.map((s, i) => {
                    return <Link href={s.path} key={i} prefetch={true} className="flex flex-col items-center justify-cetner">
                        <span
                            className={clsx(
                                        'text-white flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors duration-200 lg:h-12 lg:w-12 lg:text-lg',
                                        {
                                            'border-none bg-emerald-800 text-black group-hover:border-none group-hover:text-black':
                                            currentPathname === s.route,
                                            'border-black/75 bg-emerald-400 group-hover:border-white group-hover:text-black text-black':
                                            currentPathname !== s.route,
                                        }
                                    )}
                                >
                            {i + 1}
                        </span>
                        <span
                            className={clsx(
                                        'text-black transition-colors duration-200 group-hover:text-white lg:block text-center',
                                        {
                                            'font-light': currentPathname !== s.route,
                                            'font-semibold text-black': currentPathname === s.route,
                                        }
                                    )}
                                >
                            {s.name}
                        </span>
                    </Link>
                })}
            </div>
        </div>
    );
}

export default StepNavigation;