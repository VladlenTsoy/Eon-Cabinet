import React from 'react';
import AnswerIntermediateWrapper from "../../../layouts/intermediate/layouts/answer-intermediate/AnwerIntermediate.layout";
import {useSelector} from "react-redux";

const IntermediateBlock = () => {
    const {totals, currentTimes} = useSelector((state: any) => state.game);
    return <AnswerIntermediateWrapper>
        <span className="title">Ваш ответ</span>
        <span className="desc">{totals[currentTimes].user}</span>
        <span className="title">Правильный ответ</span>
        <span className="desc">{totals[currentTimes].answer}</span>
    </AnswerIntermediateWrapper>;
};

export default IntermediateBlock;