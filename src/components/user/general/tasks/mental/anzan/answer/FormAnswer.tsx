import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from "antd";
import {useSelector} from "react-redux";
import styled from "styled-components";

interface FormAnswerProps {
    form: any;
    autofocus: boolean;
    name?: string;
}

const InputWrapper = styled(Input)`
    text-align: center;
`;

const FormAnswer: React.FC<FormAnswerProps> = ({form, autofocus, name = 'user'}) => {
    const {game} = useSelector((state: any) => state);
    const {setting, totals} = game;
    const {getFieldDecorator} = form;

    return setting.extra && setting.extra.includes('group') ?
        totals.map((total: any, key: any) =>
            <Form.Item key={key}>
                {getFieldDecorator(`${name}[${key}]`, {
                    rules: [
                        {required: true, message: `Введите ответ №${key}!`},
                    ]
                })(
                    <InputWrapper placeholder={`Ваш ответ №${key}`} autoFocus={autofocus && key === 1} autoComplete="off"/>
                )}
            </Form.Item>
        ) :
        <Form.Item>
            {getFieldDecorator(name, {
                rules: [
                    {required: true, message: 'Введите ответ!'},
                ]
            })(
                <InputWrapper placeholder="Ваш ответ" autoFocus={autofocus} size="large" autoComplete="off"/>
            )}
        </Form.Item>;
};

export default FormAnswer;