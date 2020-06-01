import React from 'react';
import AnswerIntermediateWrapper
    from "../../../layouts/intermediate/layouts/answer-intermediate/AnwerIntermediate.layout";
import {useSelector} from "react-redux";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";
import {settingAnzan} from "../../../../../../../store/reducers/common/tasks/setting/reducer";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";

const IntermediateBlock = () => {
    const {currentTimes} = useSelector(gameSelector);
    const setting = useSelector(settingAnzan);
    const totals: any = useSelector(totalsSelect);

    return <AnswerIntermediateWrapper>
        {setting.anzan === 'double' ?
            [
                <span className="title" key={1}>Ваш ответ</span>,
                <span className="desc double" key={2}>
                    <span className={`${totals[currentTimes][0].result ? '' : 'danger'}`}>
                        {totals[currentTimes][0].user}
                    </span>
                    <span className={`${totals[currentTimes][1].result ? '' : 'danger'}`}>
                        {totals[currentTimes][1].user}
                    </span>
                </span>,
                <span className="title" key={3}>Правильный ответ </span>,
                <span className="desc double" key={4}>
                    <span className={`${totals[currentTimes][0].result ? '' : 'danger'}`}>
                        {totals[currentTimes][0].answer}
                    </span>
                    <span className={`${totals[currentTimes][1].result ? '' : 'danger'}`}>
                        {totals[currentTimes][1].answer}
                    </span>
                </span>
            ] : [
                <span className="title" key={1}>Ваш ответ</span>,
                <span className={`desc ${totals[currentTimes].result ? '' : 'danger'}`} key={2}>
                        {totals[currentTimes].user}
                    </span>,
                <span className="title" key={3}>Правильный ответ</span>,
                <span className={`desc ${totals[currentTimes].result ? '' : 'danger'}`} key={4}>
                        {totals[currentTimes].answer}
                    </span>
            ]
        }
    </AnswerIntermediateWrapper>;
};

export default IntermediateBlock;