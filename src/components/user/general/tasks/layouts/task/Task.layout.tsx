import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Intermediate from "../intermediate/Intermediate";
import Result from "../result/Result";
import PreparationLayout from "../application/preparation/Preparation.layout";
import {game} from "../../../../../../store/game/reducer";
import {gameChangeStatus} from "../../../../../../store/game/actions";

interface TaskProps {
    preparation?: boolean;
    start: React.ReactNode;
    answer?: React.ReactNode;
    intermediate?: React.ReactNode;
    result?: React.ReactNode;
}

const TaskLayout: React.FC<TaskProps> = (
    {
        preparation = false,
        start,
        answer,
        intermediate,
        result
    }
) => {
    const {status} = useSelector(game);
    const dispatch = useDispatch();

    if(status === 'preparation' && !preparation)
        dispatch(gameChangeStatus('start'));

    return <>
        {status === 'preparation' && preparation && <PreparationLayout/>}
        {status === 'start' && start}
        {/*// TODO - возможен пустой экран*/}
        {status === 'answer' && answer && answer}
        {status === 'intermediate' && intermediate && <Intermediate>{intermediate}</Intermediate>}
        {status === 'result' && result && <Result>{result}</Result>}
    </>;
};

export default TaskLayout;