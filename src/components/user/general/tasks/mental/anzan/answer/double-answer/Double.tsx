import React from 'react';
import {Col, Row} from "antd";
import {useSelector} from "react-redux";
import FormInputAnswerLayout from "../../../../layouts/answer/form-input-answer/FormInputAnswer.layout";

const Double: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const {setting, totals} = game;
    const isGroup = setting.extra && setting.extra.includes('group');

    return <Row justify="center" align="middle" gutter={15}>
        <Col span={12}>
            {
                isGroup ?
                    totals.map((total: any, key: any) =>
                        <FormInputAnswerLayout
                            key={key} group autoFocus
                            type="number" answerKey={key} name="answer1"/>
                    ) :
                    <FormInputAnswerLayout
                        type="number" answerKey={0}
                        autoFocus name="answer1"/>
            }
        </Col>
        <Col span={12}>
            {
                isGroup ?
                    totals.map((total: any, key: any) =>
                        <FormInputAnswerLayout
                            type="number" answerKey={key}
                            group key={key} name="answer2"/>
                    ) :
                    <FormInputAnswerLayout
                        type="number" answerKey={0} name="answer2"/>
            }
        </Col>
    </Row>;
};

export default Double;