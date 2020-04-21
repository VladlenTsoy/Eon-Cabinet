import React from 'react';
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import {ArrowRightOutlined} from '@ant-design/icons';
import {Button, Typography} from "antd";
import {useSelector} from "react-redux";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";

const {Title} = Typography;

const Answer: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const {totals} = game;

    const checkHandler = (values: any) => {
        let _totals = totals.map((total: any, key: number) => ({
            ...total,
            user: values.answer[key],
            result: String(total.exercise.word).toLowerCase() === String(values.answer[key]).toLowerCase()
        }));
        return {
            status: 'result',
            totals: _totals,
            stats: {all: totals.length, success: _totals.filter((val: any) => val.result).length},
        };
    };

    return (
        <AnswerLayout cols={{xl: 10, md: 12, xs: 24}} checkHandler={checkHandler}>
            <Title level={2}>Введите ответы</Title>
            {
                totals.map((total: any, key: number) =>
                    <FormInputAnswerLayout
                        group={key + 1}
                        index={key}
                        autoFocus={0}
                        title={
                            `Введите слово цифры ${Number(totals[key].exercise.number) > 9 ?
                                totals[key].exercise.number :
                                `0${totals[key].exercise.number}`}`
                        }
                        key={key}
                    />
                )
            }
            <Button type="primary" htmlType="submit" block size="large" icon={<ArrowRightOutlined/>}>
                Далее
            </Button>
        </AnswerLayout>
    );
};

export default Answer;