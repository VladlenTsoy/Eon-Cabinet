import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import AnswerInput from "./answer-input/AnswerInput";
import {Card} from "lib/ui";
import {Form} from "antd";
import {changeStatus, gameSelector, changeTotals, updateCurrentTotal} from "../../../../../../../store/common/game/gameSplice";
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

const Answer: React.FC = () => {
    let {currentTimes, totals, setting} = useSelector(gameSelector);
    const [isAnswersOpen, setIsAnswersOpen] = useState(false);
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const submitHandler = (values: any) => {
        const result = (setting.group ? totals : totals[currentTimes]).answer
            .map(function (answer: any, key: number) {
                if (setting.group)
                    return answer.map((val: any, answKey: number) =>
                        Number(val) === Number(values.answer[key][answKey])
                    );

                return Number(answer) === Number(values.answer[key]);
            });

        if (setting.group) {
            dispatch(changeTotals({...totals, user: values.answer, result}));
        }else {
            dispatch(updateCurrentTotal({user: values.answer, result}));
        }
        dispatch(changeStatus(setting.mode === 'multiplication' && !setting.group ? 'intermediate' : 'result'));
    };

    const openAnswer = () =>
        setIsAnswersOpen(true);

    return <CardWrapper>
        <Header
            isAnswersOpen={isAnswersOpen}
            openAnswer={openAnswer}
        />
        <FormWrapper
            form={form}
            id="form-answer"
            onFinish={submitHandler}
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
                            isWait={!setting.group && setting.windows[key].times < currentTimes + 1}
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

export default Answer;