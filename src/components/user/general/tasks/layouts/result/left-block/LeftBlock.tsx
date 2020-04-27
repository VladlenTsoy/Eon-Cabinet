import React from 'react';
import CurrentExerciseDrawnBLock
    from "../../../../../../../layouts/result/layouts/blocks/current-exercise-drawn-block/CurrentExerciseDrawnBlock";
import {useSelector} from "react-redux";
import {game} from "../../../../../../../store/game/reducer";
import BackBlock from "./back-block/BackBlock";

const LeftBlock: React.FC = ({children}) => {
    const {stats} = useSelector(game);
    return <>
        <CurrentExerciseDrawnBLock stats={stats}>
            {children}
        </CurrentExerciseDrawnBLock>
        <BackBlock/>
    </>;
};

export default LeftBlock;