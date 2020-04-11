import React from "react";
import {useSelector} from "react-redux";
import Application from "../../../../../general/tasks/mnemonics/master-system/application/Application";
import Answer from "../../../../../general/tasks/mnemonics/master-system/answer/Answer";
import ResultBlock from "../../../../../general/tasks/mnemonics/master-system/result/Result";
import Result from "../../layouts/result/Result";

const MasterSystem: React.FC = () => {
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

export default MasterSystem;