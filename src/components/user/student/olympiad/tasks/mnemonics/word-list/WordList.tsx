import React from "react";
import {useSelector} from "react-redux";
import Application from "components/user/general/tasks/mnemonics/word-list/application/Application";
import Answer from "components/user/general/tasks/mnemonics/word-list/answer/Answer";
import Result from "../../layouts/result/Result";
import ResultBlock from "components/user/general/tasks/mnemonics/word-list/result/Result";

const WordList: React.FC = () => {
    const {status, setting} = useSelector((state: any) => state.game);
    return <>
        {status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh' ||
        (setting.mode === 'list' && status === 'answer') ||
        (setting.mode === 'list' && status === 'intermediate') ?
            <Application/> : null}
        {setting.mode === 'basic' && status === 'answer' ?
            <Answer/> : null}
        {status === 'result' ?
            <Result>
                <ResultBlock/>
            </Result> : null}
    </>;
};

export default WordList;