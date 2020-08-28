import React from 'react';
import CurrentExerciseDrawnBLock
    from "../../../../../../../../lib/layouts/pages/result/layouts/blocks/current-exercise-drawn-block/CurrentExerciseDrawnBlock";
import BackBlock from "./back-block/BackBlock";

interface LeftBlockProps {
    resultId?: number;
    isView: boolean;
    updateIsView: (state: boolean) => void;
}

const LeftBlock: React.FC<LeftBlockProps> = (
    {
        children,
        resultId,
        isView,
        updateIsView
    }
) => {
    return <>
        <CurrentExerciseDrawnBLock resultId={resultId} isView={isView} updateIsView={updateIsView}>
            {children}
        </CurrentExerciseDrawnBLock>
        <BackBlock/>
    </>;
};

export default LeftBlock;