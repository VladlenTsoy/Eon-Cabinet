import React from 'react';
import {useSelector} from "react-redux";
import Answer from "./answer/Answer";
import Intermediate from "../../layouts/intermediate/Intermediate";
import IntermediateBlock from "./intermediate/Intermediate";
import Result from "../../layouts/result/Result";
import ResultBlock from "./result/Result";
import Application from "./application/Application";

const Anzan: React.FC = () => {
    const {status, setting} = useSelector((state: any) => state.game);
    const isApplication =
        (setting.anzan === 'list' && status === 'answer') ||
        status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh';

    return <>
        {isApplication ? <Application/> : null}
        {setting.anzan !== 'list' && status === 'answer' ? <Answer/> : null}
        {status === 'intermediate' ?
            <Intermediate>
                <IntermediateBlock/>
            </Intermediate> :
            null}
        {status === 'result' ?
            <Result>
                <ResultBlock/>
            </Result> :
            null}
    </>;
};

export default Anzan;