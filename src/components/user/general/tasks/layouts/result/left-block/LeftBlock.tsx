import React from 'react';
import CurrentExerciseDrawnBLock
    from "../../../../../../../layouts/result/layouts/blocks/current-exercise-drawn-block/CurrentExerciseDrawnBlock";
import BackBlock from "./back-block/BackBlock";

const LeftBlock: React.FC = ({children}) => {
    return <>
        <CurrentExerciseDrawnBLock>
            {children}
        </CurrentExerciseDrawnBLock>
        <BackBlock/>
    </>;
};

export default LeftBlock;