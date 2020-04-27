import React from "react";
import {useSelector} from "react-redux";
import {game} from "../../../../../../store/game/reducer";
import Intermediate from "../../../../general/tasks/layouts/intermediate/Intermediate";
import Result from "../layouts/result/Result";

interface TaskProps {
    start: React.ReactNode;
    answer?: React.ReactNode;
    intermediate?: React.ReactNode;
    result?: React.ReactNode;
}

const TaskLayout: React.FC<TaskProps> = (
    {
        start,
        answer,
        intermediate,
        result
    }
) => {
    const {status} = useSelector(game);

    return <>
        {status === 'start' && start}
        {/*// TODO - возможен пустой экран*/}
        {status === 'answer' && answer && answer}
        {status === 'intermediate' && intermediate && <Intermediate>{intermediate}</Intermediate>}
        {status === 'result' && result && <Result>{result}</Result>}
    </>;
};

export default TaskLayout;