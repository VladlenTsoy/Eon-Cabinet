import React from 'react';
import {useSelector} from "react-redux";
import Application from "./application/Application";
import Answer from "./answer/Answer";
import Result from "../../layouts/result/Result";
import ResultBlock from "./result/Result";

const DigitalRow:React.FC = ({children}) => {
    const {status} = useSelector((state: any) => state.game);
    return <>
        {status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh' ? <Application/> : null}
        {status === 'answer' ? <Answer/> : null}
        {status === 'result' ?
            children ||
            <Result>
                <ResultBlock/>
            </Result> :
            null}
    </>;
};

export default DigitalRow;