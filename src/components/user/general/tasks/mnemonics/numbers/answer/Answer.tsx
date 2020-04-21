import React from 'react';
import {useSelector} from "react-redux";
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {ArrowRightOutlined} from '@ant-design/icons';
import {Button, Typography} from "antd";

const {Title} = Typography;

const Answer: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const {totals} = game;

    const checkHandler = (values: any) => {
        let _totals = totals.map((total: any, key: number) => ({
            ...total,
            user: Number(values.answer[key]),
            result: Number(total.exercise) === Number(values.answer[key])
        }));

        return {
            status: 'result',
            totals: _totals,
            stats: {success: _totals.filter((val: any) => val.result).length},
        };
    };

    return <AnswerLayout cols={{xl: 10, md: 12, xs: 24}} checkHandler={checkHandler}>
        <Title level={2}>Введите ответы</Title>
        {
            totals.map((total: any, key: number) =>
                <FormInputAnswerLayout group={key + 1} index={key} autoFocus={0} key={key}/>
            )
        }
        <Button type="primary" htmlType="submit" block size="large" icon={<ArrowRightOutlined/>}>
            Далее
        </Button>
    </AnswerLayout>
};

export default Answer;