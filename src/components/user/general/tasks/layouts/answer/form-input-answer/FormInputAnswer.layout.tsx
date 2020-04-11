import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from "antd";
import {Typography} from "antd";
import styled from "styled-components";

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
    form: any;
    group?: boolean;
    title?: string;
    answerKey: number;
}

const FormInputAnswerLayout: React.FC<FormInputAnswer> = (
    {
        form,
        title,
        group,
        answerKey
    }
) => {
    const {getFieldDecorator} = form;

    return <AnswerInputWrapper>
        {group ? <Title level={4}>{title ? title : `Ответ №${answerKey + 1}`}</Title> : null}
        <Form.Item key={answerKey}>
            {getFieldDecorator(group ? `answer[${answerKey}]` : 'answer', {
                rules: [
                    {required: true, message: group ? `Введите ответ №${answerKey + 1}!` : 'Введите ответ!'},
                ]
            })(
                <InputWrapper
                    size="large"
                    placeholder="Ответ"
                    autoFocus={answerKey === 0}
                    autoComplete="off"
                />
            )}
        </Form.Item>
    </AnswerInputWrapper>;
};

export default FormInputAnswerLayout;