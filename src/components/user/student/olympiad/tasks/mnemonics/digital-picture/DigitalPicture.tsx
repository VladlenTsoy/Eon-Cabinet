import React from "react";
import {useSelector} from "react-redux";
import Application from "../../../../../general/tasks/mnemonics/digital-picture/application/Application";
import Answer from "../../../../../general/tasks/mnemonics/digital-picture/answer/Answer";
import Result from "../../layouts/result/Result";

const DigitalPicture:React.FC = () => {
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

export default DigitalPicture;