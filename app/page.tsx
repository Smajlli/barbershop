'use client'

import {useMultistepForm} from "@/app/hooks/useMultistepForm"

export default function Home() {
  const {steps, currentStepIndex, step, next, back} = useMultistepForm([<div>One</div>, <div>Two</div>, <div>Three</div>]);

  const handleNext = () => {
    next();
  }

  const handleBack = () => {
    back();
  }

  return <div className="w-full h-full flex items-center justify-center">
    <div className="relative p-10 rounded-lg shadow-md bg-slate-50 w-4/5">
    <form>
      {steps.length === 0 ? null : steps.length === 1 ? <div className="flex flex-row items-center absolute bottom-2 right-2 gap-2">
        <div className="w-5 h-5 rounded-full border-slate-500 border-2 border-solid"></div>
      </div> : steps.length === 2 ? <div className="flex flex-row items-center absolute bottom-2 right-2 gap-2">
        <div className="w-5 h-5 rounded-full border-slate-500 border-2 border-solid"></div>
        <div className="w-5 h-5 rounded-full border-slate-500 border-2 border-solid"></div>
      </div> : <div className="flex flex-row items-center absolute bottom-2 right-2 gap-2">
        <div className="w-5 h-5 rounded-full border-slate-500 border-2 border-solid"></div>
        <div className="w-5 h-5 rounded-full border-slate-500 border-2 border-solid"></div>
        <div className="w-5 h-5 rounded-full border-slate-500 border-2 border-solid"></div>
      </div>}
      {step}
      <div className="flex flex-row gap-2 absolute bottom-2 left-2 mt-4">
        {currentStepIndex !== 0 && <button type="button" className="px-3 py-2 bg-emerald-300 text-white rounded-xl" onClick={handleBack}>Back</button>}
        {currentStepIndex !== steps.length - 1 && <button type="button" className="px-3 py-2 bg-emerald-300 text-white rounded-xl" onClick={handleNext}>Next</button>}
      </div>
    </form>
  </div>
  </div>
}
