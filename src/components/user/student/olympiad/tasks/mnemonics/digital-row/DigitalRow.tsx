import React from "react";
import {useSelector} from "react-redux";
import Application from "../../../../../general/tasks/mnemonics/digital-row/application/Application";
import Answer from "../../../../../general/tasks/mnemonics/digital-row/answer/Answer";
import Result from "../../layouts/result/Result";
import ResultBlock from "../../../../../general/tasks/mnemonics/digital-row/result/Result";

const DigitalRow: React.FC = () => {
    const {status} = useSelector((state: any) => state.game);
    return <>
        {status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh' ? <Application/> : null}
        {status === 'answer' ? <Answer/> : null}
        {status === 'result' ?
            <Result>
                <ResultBlock/>
            </Result> :
            null}
    </>;
};

export default DigitalRow;