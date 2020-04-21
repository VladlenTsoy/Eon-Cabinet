import React from 'react';
import AnswerLayout from "../../../layouts/answer/Answer.layout";
import {ArrowRightOutlined} from '@ant-design/icons';
import {Button, Typography} from "antd";
import FormInputAnswerLayout from "../../../layouts/answer/form-input-answer/FormInputAnswer.layout";
import {useSelector} from "react-redux";

const {Title} = Typography;

interface AnswerProps {
}

const Answer: React.FC<AnswerProps> = () => {
    const {game} = useSelector((state: any) => state);
    const {totals, currentTimes} = game;

    /**
     *
     *
     * @param values
     */
    const checkHandler = (values: any) => {
        let success = 0;
        totals[currentTimes].user = values.answer.replace(/\s/g, '');
        totals[currentTimes].result = totals[currentTimes].exercise === totals[currentTimes].user;

        totals[currentTimes].exercise.split('')
            .map((val: any, key: number) => {
                if (totals[currentTimes].user[key] === val) success++;
                return success;
            });

        return {
            totals: totals,
            stats: {success},
            status: 'result',
        };
    };

    return (
        <AnswerLayout
            cols={{xl: 10, md: 12, xs: 24}}
            checkHandler={checkHandler}
        >
            <Title level={2}>Введите ответ</Title>
            <FormInputAnswerLayout index={0} autoFocus={0}/>
            <Button type="primary" htmlType="submit" block size="large" icon={<ArrowRightOutlined/>}>
                Далее
            </Button>
        </AnswerLayout>
    );
};

export default Answer;