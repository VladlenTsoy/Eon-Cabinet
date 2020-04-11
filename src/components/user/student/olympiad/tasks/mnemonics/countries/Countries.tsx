import React from "react";
import {useSelector} from "react-redux";
import Application from "../../../../../general/tasks/mnemonics/countries/application/Application";
import Answer from "../../../../../general/tasks/mnemonics/countries/answer/Answer";
import Result from "../../layouts/result/Result";
import ResultBlock from "../../../../../general/tasks/mnemonics/countries/result/Result";

const Countries: React.FC = () => {
    const {status} = useSelector((state: any) => state.game);
    return <>
        {status === 'start' ||
        status === 'again' ||
        status === 'repeat' ||
        status === 'refresh' ? <Application/> : null}
        {status === 'answer' ? <Answer/> : null}
        {status === 'result' ?
            <Result>
                <ResultBlock/>
            </Result> :
            null}
    </>;
};

export default Countries;