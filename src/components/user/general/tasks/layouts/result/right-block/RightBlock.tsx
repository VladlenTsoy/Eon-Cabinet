import React from 'react';
import AgainBlock from "./again-block/AgainBlock";
import RepeatBlock from "./repeat-block/RepeatBlock";
import {useRouteMatch} from "react-router";
import {ResultMatchProps} from "../Result";
import NextBlock from "./next-block/NextBlock";
import CounterBlock from "./counter-block/CounterBlock";

interface RightBlockProps {
    resultData: any;
}

const RightBlock: React.FC<RightBlockProps> = ({resultData}) => {
    const match = useRouteMatch<ResultMatchProps>();

    if (match.params.homeworkId && match.params.id)
        return <>
            <CounterBlock resultData={resultData}/>
            <NextBlock nextTask={resultData.next_task}/>
        </>;

    return <>
        <RepeatBlock/>
        <AgainBlock/>
    </>;
};

export default React.memo(RightBlock);