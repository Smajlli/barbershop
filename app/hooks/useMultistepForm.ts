import next from "next";
import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function next() {
        setCurrentStepIndex(curr => {
            if(currentStepIndex >= steps.length - 1) {
            return curr;
        } else {
            return curr + 1;
        }
        })
    }

    function back() {
        setCurrentStepIndex(curr => {
            if(curr <= 0) {
                return curr;
            } else {
                return curr - 1;
            }
        })
    }

    function goTo(index:number) {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        next, 
        back
    };
}