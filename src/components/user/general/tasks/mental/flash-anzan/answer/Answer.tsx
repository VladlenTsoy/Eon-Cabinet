import React from 'react';
import {Button, Typography} from "antd";
import {useSelector} from "react-redux";
import {ArrowRightOutlined} from '@ant-design/icons';
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";

const {Title} = Typography;

const Answer: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const {totals, stats} = game;

    const onFinishSubmit = (values: any) => {
        let _totals = totals.map((total: any, key: number) => {
            let result = total.answer === Number(values.answer[key]);
            result && stats.success++;

            return {...total, ...{user: Number(values.answer[key]), result}};
        });
        return {status: 'result', stats, totals: _totals};
    };

    return <AnswerLayout cols={{xl: 10, md: 12, sm: 14, xs: 24}} checkHandler={onFinishSubmit}>
        <Title level={2}>Введите ответ</Title>
        {totals.map((total: any, key: any) =>
            <FormInputAnswerLayout
                key={key} group={key + 1}
                type="number" autoFocus={0} index={key}
            />
        )}
        <Button type="primary" htmlType="submit" size="large" block icon={<ArrowRightOutlined/>}>
            Далее
        </Button>
    </AnswerLayout>;
};

export default Answer;
