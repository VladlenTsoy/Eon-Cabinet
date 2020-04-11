import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import AnswerInput from "./answer-input/AnswerInput";
import {Card} from "lib";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import {gameChangeStatus, gameChangeTotals} from "../../../../../../../store/game/actions";
import MultiGridLayout from "../layouts/MultiGrid.layout";
import Header from "./header/Header";

const CardWrapper = styled(Card)`
  &.ant-card {
    margin-bottom: 0;
    height: 100%;
    
    .ant-card-body {
      height: 100%;
    }
  }
`;

const FormWrapper = styled(Form)`
  height: calc(100% - 65px);
  margin-right: 0;
  margin-left: 0;
`;

const Answer: React.FC<FormComponentProps> = (
    {
        form,
    }
) => {
    const {game} = useSelector((state: any) => state);
    let {totals, setting, currentTimes} = game;
    const [isAnswersOpen, setIsAnswersOpen] = useState(false);
    const dispatch = useDispatch();

    const submitHandler = (e: any) => {
        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                let result = (setting.group ? totals : totals[currentTimes]).answer
                    .map(function (answer: any, key: number) {
                        if (setting.group)
                            return answer.map((val: any, answKey: number) =>
                                Number(val) === Number(values.answer[key][answKey])
                            );

                        return Number(answer) === Number(values.answer[key]);
                    });

                if (setting.group)
                    totals = {...totals, user: values.answer, result};
                else
                    totals[currentTimes] = {...totals[currentTimes], user: values.answer, result};

                dispatch(gameChangeTotals(totals));
                dispatch(gameChangeStatus(setting.mode === 'multiplication' && !setting.group ? 'intermediate' : 'result'));
            }
        });
    };

    const openAnswer = () =>
        setIsAnswersOpen(true);

    return <CardWrapper>
        <Header
            isAnswersOpen={isAnswersOpen}
            openAnswer={openAnswer}
        />
        <FormWrapper
            id="form-answer"
            onSubmit={submitHandler}
        >
            <MultiGridLayout
                background="@background-color-base"
                gridGap={1}
                gridGapType="px"
                length={(setting.group ? totals : totals[currentTimes]).exercise.length}
            >
                {(setting.group ? totals : totals[currentTimes])
                    .exercise.map((exercise: any, key: number) =>
                        <AnswerInput
                            isWait={!setting.group && setting.windows[key].times < currentTimes}
                            isAnswersOpen={isAnswersOpen}
                            form={form}
                            taskKey={key}
                            key={key}
                        />
                    )}
            </MultiGridLayout>
        </FormWrapper>
    </CardWrapper>;
};

export default Form.create<FormComponentProps>()(Answer);