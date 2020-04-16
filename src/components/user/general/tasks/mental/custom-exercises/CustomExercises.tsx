import React from 'react';
import {useSelector} from "react-redux";
import Application from "./application/Application";
import Answer from "../anzan/answer/Answer";
import Intermediate from "../../layouts/intermediate/Intermediate";
import IntermediateBlock from "../anzan/intermediate/Intermediate";
import Result from "../../layouts/result/Result";
import ResultBlock from "../anzan/result/Result";

const CustomExercises = () => {
    const {status, setting} = useSelector((state: any) => state.game);
    const isApplication =
        (setting.type_task === 'list' && status === 'answer') ||
        status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh';

    return <>
        {isApplication ? <Application/> : null}
        {setting.type_task !== 'list' && status === 'answer' ? <Answer/> : null}
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

export default CustomExercises;