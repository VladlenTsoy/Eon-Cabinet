import React from 'react';
import {useSelector} from "react-redux";
import Application from "./application/Application";
import Answer from "./answer/Answer";
import Result from "../../layouts/result/Result";
import ResultBlock from "./result/Result";

const WordList: React.FC = ({children}) => {
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
            children ||
            <Result>
                <ResultBlock/>
            </Result> :
            null}
    </>;
};

export default WordList;