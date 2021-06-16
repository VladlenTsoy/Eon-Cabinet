import React, {useState} from 'react';
import Tabs from "./tabs/Tabs";
import Tab from "./tabs/tab/Tab";
import Step from "./step/Step";

interface StepsProps {
    olympiad: any;
}

const Steps: React.FC<StepsProps> = ({olympiad}) => {
    const [currentStep, setCurrentStep] = useState(
        olympiad.steps.find((step: any) => step.id === olympiad.current_step.id)
    );

    const clickHandler = (step: any) => {
        setCurrentStep(step);
    };

    return <>
        <Tabs>
            {olympiad.steps.map((step: any) =>
                <Tab
                    step={step}
                    selectStep={currentStep}
                    currentStep={olympiad.current_step}
                    clickHandler={clickHandler}
                    key={step.step}
                />
            )}
        </Tabs>
        <Step currentStep={currentStep} key={currentStep.id}/>
    </>;
};

export default Steps;