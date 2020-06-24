import React from 'react';
import AgainBlock from "./again-block/AgainBlock";
import RepeatBlock from "./repeat-block/RepeatBlock";
import {useParams} from "react-router";
import {ResultMatchProps} from "../Result";
import NextBlock from "./next-block/NextBlock";
import CounterBlock from "./counter-block/CounterBlock";

interface RightBlockProps {
    result: boolean;
    isView: boolean;
    resultData: any;
}

const RightBlock: React.FC<RightBlockProps> = ({isView, result, resultData}) => {
    const {homeworkId, id} = useParams<ResultMatchProps>();

    if (homeworkId && id)
        return <>
            <CounterBlock resultData={resultData}/>
            {!result && !resultData.is_second && <RepeatBlock isView={isView}/>}
            {/*{resultData.next_task && <NextBlock nextTask={resultData.next_task}/>}*/}
        </>;

    return <>
        <RepeatBlock/>
        <AgainBlock/>
    </>;
};

export default React.memo(RightBlock);