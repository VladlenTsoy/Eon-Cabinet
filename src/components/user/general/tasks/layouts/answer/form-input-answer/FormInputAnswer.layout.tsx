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
    type?: string;
    group?: boolean;
    autoFocus?: boolean;
    title?: string;
    answerKey: number;
    name?: string;
}

const FormInputAnswerLayout: React.FC<FormInputAnswer> = (
    {
        title,
        type= 'text',
        group,
        autoFocus= false,
        answerKey,
        name = 'answer',
    }
) => {
    return <AnswerInputWrapper>
        {group ? <Title level={4}>{title ? title : `Ответ №${answerKey}`}</Title> : null}
        <FormItem
            key={answerKey}
            name={group ? [name, answerKey] : name}
            requiredMsg={group ? `Введите ответ №${answerKey}!` : 'Введите ответ!'}
        >
            <InputWrapper
                type={type}
                size="large"
                placeholder="Ответ"
                autoFocus={autoFocus && answerKey === 1}
                autoComplete="off"
            />
        </FormItem>
    </AnswerInputWrapper>;
};

export default FormInputAnswerLayout;