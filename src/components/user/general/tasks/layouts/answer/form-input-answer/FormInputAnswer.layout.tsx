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
    group?: number;
    autoFocus?: number;
    title?: string;
    index: number;
    name?: string;
}

const FormInputAnswerLayout: React.FC<FormInputAnswer> = (
    {
        title,
        type = 'text',
        group,
        autoFocus,
        index,
        name = 'answer',
    }
) => {
    return <AnswerInputWrapper>
        {group !== undefined && <Title level={4}>{title ? title : `Ответ №${group}`}</Title>}
        <FormItem
            key={index}
            name={group !== undefined ? [name, group] : name}
            requiredMsg={group !== undefined ? `Введите ответ №${group}!` : 'Введите ответ!'}
        >
            <InputWrapper
                type={type}
                size="large"
                placeholder="Ответ"
                autoFocus={index === autoFocus}
                autoComplete="off"
            />
        </FormItem>
    </AnswerInputWrapper>;
};

export default FormInputAnswerLayout;