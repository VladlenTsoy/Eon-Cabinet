import React from 'react';
import {useSelector} from "react-redux";
import Intermediate from "../intermediate/Intermediate";
import ResultHomework from "../result/homework/Result";
import ResultOlympiad from "../result/olympiad/Result";
import {gameSelector} from "../../../../../../store/reducers/common/game/gameSplice";
import {useRouteMatch} from "react-router-dom";

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
    const {params} = useRouteMatch<any>();
    const {status} = useSelector(gameSelector);

    return <>
        {status === 'start' && start}
        {/*// TODO - возможен пустой экран*/}
        {status === 'answer' && answer && answer}
        {status === 'intermediate' && intermediate && <Intermediate>{intermediate}</Intermediate>}
        {
            status === 'result' && result && (
                params?.sentOlympiadId ?
                    <ResultOlympiad children={result}/> :
                    <ResultHomework children={result}/>
            )
        }
    </>;
};

export default TaskLayout;