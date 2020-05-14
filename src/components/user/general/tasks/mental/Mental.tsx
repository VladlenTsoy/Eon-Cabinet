import React from 'react';
import Anzan from "./anzan/Anzan";
import FlashAnzan from "./flash-anzan/FlashAnzan";
import SpecialAnzan from "./special-anzan/SpecialAnzan";
import MultiAnzan from "./multi-anzan/MultiAnzan";
import Progression from "./progression/Progression";
import CustomExercises from "./custom-exercises/CustomExercises";

interface MentalProps {
    taskId: string;
}

const Mental: React.FC<MentalProps> = ({taskId}) => {
    const selectTaskById = (id: number) => {
        switch (id) {
            case 1:
                return <Anzan/>;
            case 2:
                return <Anzan/>;
            case 3:
                return <Anzan/>;
            case 4:
                return <Anzan/>;
            case 18:
                return <Anzan/>;
            case 23:
                return <Anzan/>;
            case 6:
                return <FlashAnzan/>;
            case 17:
                return <SpecialAnzan/>;
            case 21:
                return <MultiAnzan/>;
            case 22:
                return <Progression/>;
            case 24:
                return <CustomExercises/>;
        }
    };

    return <>
        {selectTaskById(Number(taskId))}
    </>;
};

export default Mental;