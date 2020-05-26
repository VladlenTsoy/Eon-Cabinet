import React from 'react';
import {Col, Row} from "antd";
import {useSelector} from "react-redux";
import FormInputAnswerLayout from "../../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {settingAnzan} from "../../../../../../../../store/reducers/common/tasks/setting/reducer";
import {totalsSelect} from "../../../../../../../../store/reducers/common/tasks/totals/reducer";

const Double: React.FC = () => {
    const setting = useSelector(settingAnzan);
    const totals: any = useSelector(totalsSelect);

    const isGroup = setting.extra && setting.extra.includes('group');

    return <Row justify="center" align="middle" gutter={15}>
        <Col span={12}>
            {
                isGroup ?
                    totals.map((total: any, key: any) =>
                        <FormInputAnswerLayout
                            key={key} group={key} autoFocus={1}
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
                            group={key} key={key} name="answer2"/>
                    ) :
                    <FormInputAnswerLayout
                        type="number" index={1} name="answer2"/>
            }
        </Col>
    </Row>;
};

export default Double;