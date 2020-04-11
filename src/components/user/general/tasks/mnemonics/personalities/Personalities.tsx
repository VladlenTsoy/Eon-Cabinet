import React from 'react';
import Application from "./application/Application";
import Answer from "./answer/Answer";
import Result from "../../layouts/result/Result";
import {useSelector} from "react-redux";
import ResultBlock from "./result/Result";

const Personalities:React.FC = () => {
    const {status} = useSelector((state: any) => state.game);
    return <>
        {status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh' ? <Application/> : null}
        {status === 'answer' ? <Answer/> : null}
        {status === 'result' ? <Result><ResultBlock/></Result> : null}
    </>;
};

export default Personalities;