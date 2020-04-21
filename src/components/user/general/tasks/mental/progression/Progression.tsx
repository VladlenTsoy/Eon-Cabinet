import React from 'react';
import {useSelector} from "react-redux";
import Application from "./application/Application";
import Answer from "./answer/Answer";
import Result from "../../layouts/result/Result";

const Progression: React.FC = () => {
    const {status} = useSelector((state: any) => state.game);
    return <>
        {status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh' ? <Application/> : null}
        {status === 'answer' ? <Answer/> : null}
        {status === 'result' ? <Result/> : null}
    </>;
};

export default Progression;