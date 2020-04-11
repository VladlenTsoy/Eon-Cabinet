import React from 'react';
import {useSelector} from "react-redux";
import Application from "./application/Application";
import Answer from "../anzan/answer/Answer";
import Result from "../../layouts/result/Result";
import Intermediate from "../../layouts/intermediate/Intermediate";
import IntermediateBlock from "./intermediate/Intermediate";

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