import {useState} from "react";

export default function useMultiStepForm(steps){
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    function next(e) {
        e.preventDefault()
        setCurrentStepIndex(prev => {
            if (prev > steps.length -1)
                return prev
            return prev + 1
        })
    }

    function back(e) {
        e.preventDefault()
        setCurrentStepIndex(prev => {
            if (prev <= 0)
                return prev
            return prev - 1
        })
    }

    function goTo(index) {
        setCurrentStepIndex(index)
    }

    return {
        currentStepIndex,
        step : steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length -1,
        next,
        back,
        goTo,
    }
}