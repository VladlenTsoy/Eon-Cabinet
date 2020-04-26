import React from 'react';
import AnswerIntermediateWrapper
    from "../../../layouts/intermediate/layouts/answer-intermediate/AnwerIntermediate.layout";
import {useSelector} from "react-redux";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {game} from "../../../../../../../store/game/reducer";

const IntermediateBlock = () => {
    const totals = useSelector(totalsSelect);
    const {currentTimes} = useSelector(game);
    return <AnswerIntermediateWrapper>
        <span className="title">Ваш ответ</span>
        <span className="desc">{totals[currentTimes].user}</span>
        <span className="title">Правильный ответ</span>
        <span className="desc">{totals[currentTimes].answer}</span>
    </AnswerIntermediateWrapper>;
};

export default IntermediateBlock;