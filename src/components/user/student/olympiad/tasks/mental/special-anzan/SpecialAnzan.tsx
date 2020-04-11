import React from "react";
import {useSelector} from "react-redux";
import Application from "../../../../../general/tasks/mental/special-anzan/application/Application";
import Answer from "../../../../../general/tasks/mental/anzan/answer/Answer";
import Intermediate from "../../../../../general/tasks/layouts/intermediate/Intermediate";
import IntermediateBlock from "../../../../../general/tasks/mental/special-anzan/intermediate/Intermediate";
import Result from "../../layouts/result/Result";

const SpecialAnzan: React.FC = () => {
    const {status} = useSelector((state: any) => state.game);
    return <>
        {status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh' ? <Application/> : null}
        {status === 'answer' ? <Answer/> : null}
        {status === 'intermediate' ?
            <Intermediate>
                <IntermediateBlock/>
            </Intermediate> : null}
        {status === 'result' ? <Result/> : null}
    </>;
};

export default SpecialAnzan;