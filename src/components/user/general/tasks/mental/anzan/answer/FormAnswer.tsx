import React from 'react';
import {Input} from "antd";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {FormItem} from "lib";

interface FormAnswerProps {
    autofocus: boolean;
    name?: string;
}

const InputWrapper = styled(Input)`
    text-align: center;
`;

const FormAnswer: React.FC<FormAnswerProps> = ({autofocus, name = 'user'}) => {
    const {game} = useSelector((state: any) => state);
    const {setting, totals} = game;

    return setting.extra && setting.extra.includes('group') ?
        totals.map((total: any, key: any) =>
            <FormItem key={key} name={[name, key]} requiredMsg={`Введите ответ №${key}!`}>
                <InputWrapper type="number" placeholder={`Ваш ответ №${key}`} autoFocus={autofocus && key === 1}
                              autoComplete="off"/>
            </FormItem>
        ) :
        <FormItem name={name} requiredMsg="Введите ответ!">
            <InputWrapper type="number" placeholder="Ваш ответ" autoFocus={autofocus} size="large" autoComplete="off"/>
        </FormItem>;
};

export default FormAnswer;