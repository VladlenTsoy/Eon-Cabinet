import React from 'react';
import AnswerIntermediateWrapper
    from "../../../layouts/intermediate/layouts/answer-intermediate/AnwerIntermediate.layout";
import {useSelector} from "react-redux";
import {gameSelector} from "store/game/gameSplice";

const IntermediateBlock = () => {
    const {currentTimes, totals} = useSelector(gameSelector);

    return <AnswerIntermediateWrapper>
        <span className="title">Ваш ответ</span>
        <span className={`desc ${!totals[currentTimes].result && 'danger'}`}>{totals[currentTimes].user}</span>
        <span className="title">Правильный ответ</span>
        <span className={`desc ${!totals[currentTimes].result && 'danger'}`}>{totals[currentTimes].answer}</span>
    </AnswerIntermediateWrapper>;
};

export default IntermediateBlock;
