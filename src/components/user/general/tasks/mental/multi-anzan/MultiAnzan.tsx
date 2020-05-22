import React from 'react';
import Application from "./application/Application";
import Answer from "./answer/Answer";
import Intermediate from "./intermediate/Intermediate";
import Result from "./result/Result";
import {useSelector} from "react-redux";
import {game} from "../../../../../../store/reducers/common/game/reducer";


const MultiAnzan: React.FC = () => {
    const {status} = useSelector(game);

    return <>
        {status === 'start' && <Application/>}
        {/*// TODO - возможен пустой экран*/}
        {status === 'answer' && <Answer/>}
        {status === 'intermediate' && <Intermediate/>}
        {status === 'result' && <Result/>}
    </>;
};

export default MultiAnzan;