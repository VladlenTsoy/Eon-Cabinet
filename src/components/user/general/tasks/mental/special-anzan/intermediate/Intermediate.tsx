import React from 'react';
import AnswerIntermediateWrapper
    from "../../../layouts/intermediate/layouts/answer-intermediate/AnwerIntermediate.layout";
import {useSelector} from "react-redux";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const IntermediateBlock = () => {
    const totals = useSelector(totalsSelect);
    const {currentTimes} = useSelector(gameSelector);
    return <AnswerIntermediateWrapper>
        <span className="title">Ваш ответ</span>
        <span className={`desc ${!totals[currentTimes].result && 'danger'}`}>{totals[currentTimes].user}</span>
        <span className="title">Правильный ответ</span>
        <span className={`desc ${!totals[currentTimes].result && 'danger'}`}>{totals[currentTimes].answer}</span>
    </AnswerIntermediateWrapper>;
};

export default IntermediateBlock;