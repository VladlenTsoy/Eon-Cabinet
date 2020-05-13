import React from 'react';
import CurrentExerciseDrawnBLock
    from "../../../../../../../../layouts/result/layouts/blocks/current-exercise-drawn-block/CurrentExerciseDrawnBlock";
import BackBlock from "./back-block/BackBlock";

interface LeftBlockProps {
    resultId?: number;}

const LeftBlock: React.FC<LeftBlockProps> = (
    {
        children,
        resultId
    }
) => {
    return <>
        <CurrentExerciseDrawnBLock resultId={resultId}>
            {children}
        </CurrentExerciseDrawnBLock>
        <BackBlock/>
    </>;
};

export default LeftBlock;