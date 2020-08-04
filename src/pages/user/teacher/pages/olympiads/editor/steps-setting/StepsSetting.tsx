import React, {useCallback, useState} from 'react';
import TasksSetting from "./tasks-setting/TasksSetting";
import EmptySteps from "./empty/EmptySteps";
import Navigation from "./navigation/Navigation";
import Actions from "./actions/Actions";

const StepsSetting: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [steps, setSteps] = useState([]);
    const [exercises, setExercises] = useState<any[][]>([]);

    const deleteStep = useCallback((_key: number) => {
        setSteps((prevState) => prevState.filter((state, key) => key !== _key));
        setExercises((prevState) => prevState.filter((state, key) => key !== _key));
    }, []);

    if (!steps.length)
        return <EmptySteps
            setSteps={setSteps}
            setCurrent={setCurrent}
            current={current}
        />;

    return <>
        <Navigation
            steps={steps}
            current={current}
            setSteps={setSteps}
            deleteStep={deleteStep}
            onChangeHandler={setCurrent}
        />
        <TasksSetting
            key={current}
            current={current}
            olympiad={undefined}
            globalExercises={exercises[current] || []}
            updateGlobalExercises={setExercises}
        >
            {steps.length - 1 === current ?
                <Actions
                    steps={steps}
                    step={steps[steps.length - 1]}
                    exercises={exercises}
                    current={current}
                    setCurrent={setCurrent}
                    setSteps={setSteps}
                /> : null
            }
        </TasksSetting>
    </>;
};

export default StepsSetting;