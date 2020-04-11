import React from 'react';
import {useSelector} from "react-redux";
import Application from "./application/Application";
import Answer from "./answer/Answer";
import Result from "./result/Result";
import Intermediate from "./intermediate/Intermediate";

const MultiAnzan: React.FC = () => {
    const {status} = useSelector((state: any) => state.game);
    return <>
        {status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh' ?
            <Application/> : null}
        {status === 'answer' ? <Answer/> : null}
        {status === 'intermediate' ? <Intermediate/> : null}
        {status === 'result' ? <Result/> : null}
    </>;
};

export default MultiAnzan;