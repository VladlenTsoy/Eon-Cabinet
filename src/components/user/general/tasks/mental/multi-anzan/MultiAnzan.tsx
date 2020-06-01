import React from 'react';
import Application from "./application/Application";
import Answer from "./answer/Answer";
import Intermediate from "./intermediate/Intermediate";
import Result from "./result/Result";
import {useSelector} from "react-redux";
import {gameSelector} from "../../../../../../store/reducers/common/game/gameSplice";


const MultiAnzan: React.FC = () => {
    const {status} = useSelector(gameSelector);

    return <>
        {status === 'start' && <Application/>}
        {/*// TODO - возможен пустой экран*/}
        {status === 'answer' && <Answer/>}
        {status === 'intermediate' && <Intermediate/>}
        {status === 'result' && <Result/>}
    </>;
};

export default MultiAnzan;