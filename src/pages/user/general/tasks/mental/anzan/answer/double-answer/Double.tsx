import React from 'react';
import {Col, Row} from "antd";
import {useSelector} from "react-redux";
import FormInputAnswerLayout from "../../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {gameSelector} from "store/game/gameSplice";

const Double: React.FC = () => {
    const {setting, totals} = useSelector(gameSelector);

    const isGroup = setting.extra && setting.extra.includes('group');

    return <Row justify="center" align="middle" gutter={15}>
        <Col span={12}>
            {
                isGroup ?
                    totals.map((total: any, key: any) =>
                        <FormInputAnswerLayout
                            key={key} group={key + 1} autoFocus={0}
                            type="number" index={key} name="answer1"/>
                    ) :
                    <FormInputAnswerLayout
                        type="number" index={1}
                        autoFocus={1} name="answer1"/>
            }
        </Col>
        <Col span={12}>
            {
                isGroup ?
                    totals.map((total: any, key: any) =>
                        <FormInputAnswerLayout
                            type="number" index={key}
                            group={key + 1} key={key} name="answer2"/>
                    ) :
                    <FormInputAnswerLayout
                        type="number" index={1} name="answer2"/>
            }
        </Col>
    </Row>;
};

export default React.memo(Double);
