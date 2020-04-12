import React from 'react';
import '@ant-design/compatible/assets/index.css';
import {Input} from "antd";
import {Typography} from "antd";
import styled from "styled-components";
import {FormItem} from "layouts/components";

const {Title} = Typography;

const AnswerInputWrapper = styled.div`
  h4.ant-typography{
    color: ${props => props.theme.color_second};
  }
`;

const InputWrapper = styled(Input)`
    text-align: center;
`;

interface FormInputAnswer {
    group?: boolean;
    title?: string;
    answerKey: number;
}

const FormInputAnswerLayout: React.FC<FormInputAnswer> = (
    {
        title,
        group,
        answerKey
    }
) => {
    return <AnswerInputWrapper>
        {group ? <Title level={4}>{title ? title : `Ответ №${answerKey + 1}`}</Title> : null}
        <FormItem
            key={answerKey}
            name={group ? `answer[${answerKey}]` : 'answer'}
            requiredMsg={group ? `Введите ответ №${answerKey + 1}!` : 'Введите ответ!'}
        >
            <InputWrapper
                size="large"
                placeholder="Ответ"
                autoFocus={answerKey === 0}
                autoComplete="off"
            />
        </FormItem>
    </AnswerInputWrapper>;
};

export default FormInputAnswerLayout;