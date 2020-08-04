import React, {useState} from 'react';
import Steps from "./steps/Steps";
import StepMore from "./step-more/StepMore";

interface StepsDetailsProps {
    olympiad: any;
}

const StepsDetails: React.FC<StepsDetailsProps> = ({olympiad}) => {
    const [current, setCurrent] = useState(olympiad.current_step ? olympiad.current_step.step : olympiad.steps.length - 1);

    const onChangeHandler = (current: number) =>
        setCurrent(current);

    return <>
        <Steps
            current={current}
            olympiad={olympiad}
            changeStep={onChangeHandler}
        />
        <StepMore
            key={current}
            step={olympiad.steps[current]}
        />
    </>;
};

export default StepsDetails;