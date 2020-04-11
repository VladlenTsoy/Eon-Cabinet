import React from "react";
import {useSelector} from "react-redux";
import Application from "../../../../../general/tasks/mnemonics/numbers/application/Application";
import Answer from "../../../../../general/tasks/mnemonics/numbers/answer/Answer";
import Result from "../../layouts/result/Result";
import ResultBlock from "../../../../../general/tasks/mnemonics/numbers/result/Result";

const Numbers:React.FC = () => {
    const {status, setting} = useSelector((state: any) => state.game);
    return <>
        {status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh' ||
        (setting['task-mode'] === 'list' && status === 'answer') ||
        (setting['task-mode'] === 'list' && status === 'intermediate') ?
            <Application/> : null}
        {setting['task-mode'] === 'basic' && status === 'answer' ?
            <Answer/> : null}
        {status === 'result' ?
            <Result>
                <ResultBlock/>
            </Result> :
            null}
    </>;
};

export default Numbers;