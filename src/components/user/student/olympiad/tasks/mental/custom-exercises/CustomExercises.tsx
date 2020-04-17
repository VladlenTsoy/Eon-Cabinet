import {useSelector} from "react-redux";
import Application from "../../../../../general/tasks/mental/custom-exercises/application/Application";
import Answer from "../../../../../general/tasks/mental/anzan/answer/Answer";
import Intermediate from "../../../../../general/tasks/layouts/intermediate/Intermediate";
import IntermediateBlock from "../../../../../general/tasks/mental/anzan/intermediate/Intermediate";
import Result from "../../layouts/result/Result";
import ResultBlock from "../../../../../general/tasks/mental/anzan/result/Result";
import React from "react";

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