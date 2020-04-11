import React from 'react';
import AnswerIntermediateWrapper from "../../../layouts/intermediate/layouts/answer-intermediate/AnwerIntermediate.layout";
import {useSelector} from "react-redux";
import {Col, Row} from "antd";

const IntermediateBlock = () => {
    const {totals, currentTimes, setting} = useSelector((state: any) => state.game);
    return <AnswerIntermediateWrapper>
        {setting.anzan === 'double' ?
            [
                <span className="title" key={1}>Ваш ответ</span>,
                <Row key={2}>
                    <Col xl={12}>
                            <span className={`desc ${totals[currentTimes][0].result ? '' : 'danger'}`}>
                                {totals[currentTimes][0].user}
                            </span>
                    </Col>
                    <Col xl={12}>
                            <span className={`desc ${totals[currentTimes][1].result ? '' : 'danger'}`}>
                                {totals[currentTimes][1].user}
                            </span>
                    </Col>
                </Row>,
                <span className="title" key={3}>Правильный ответ </span>,
                <Row key={4}>
                    <Col xl={12}>
                            <span className={`desc ${totals[currentTimes][0].result ? '' : 'danger'}`}>
                                {totals[currentTimes][0].answer}
                            </span>
                    </Col>
                    < Col xl={12}>
                            <span className={`desc ${totals[currentTimes][1].result ? '' : 'danger'}`}>
                                {totals[currentTimes][1].answer}
                            </span>
                    </Col>
                </Row>
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