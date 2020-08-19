import React from 'react';
import {Input, InputNumber} from "antd";
import {Typography} from "antd";
import styled from "styled-components";
import {FormItem} from "lib/ui";

const {Title} = Typography;

const AnswerInputWrapper = styled.div`
  h4.ant-typography{
    color: ${props => props.theme.color_second};
  }
`;

const InputWrapper = styled(Input)`
    text-align: center;
`;

const InputNumberWrapper = styled(InputNumber)`
  &.ant-input-number{
    text-align: center;
    width: 100%;
    
    input{
      text-align: center;
    }
  }
`;

interface FormInputAnswer {
    type?: string;
    group?: number;
    autoFocus?: number;
    title?: string;
    index: number;
    name?: string;
}

/**
 *
 * @param title         - Название при выводе в группе
 * @param type          - Тип инпута
 * @param group         - Вывод нескольких
 * @param autoFocus     - На какомм индексе сработает автофокус
 * @param index         - Ключ для key и autoFocus
 * @param name          - Название для формы
 * @constructor
 */
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
            name={group !== undefined ? [name, index] : name}
            requiredMsg={group !== undefined ? `Введите ответ №${group}!` : 'Введите ответ!'}
        >
            {type === 'number' ?
                <InputNumberWrapper
                    type={type}
                    size="large"
                    placeholder="Ответ"
                    autoFocus={index === autoFocus}
                    autoComplete="off"
                /> :
                <InputWrapper
                    type={type}
                    size="large"
                    placeholder="Ответ"
                    autoFocus={index === autoFocus}
                    autoComplete="off"
                />}
        </FormItem>
    </AnswerInputWrapper>;
};

export default React.memo(FormInputAnswerLayout);