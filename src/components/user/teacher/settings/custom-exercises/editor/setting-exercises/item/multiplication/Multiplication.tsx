import React from 'react';
import {InputNumber} from "antd";
import {FormItem} from "lib";
import styled from "styled-components";

const Sign = styled.p`
  font-size: 40px;
  line-height: 1;
  margin-bottom: 0.5rem;
`;

interface MultiplicationProps {
    times: any;
    controlMode: string;
}

const Multiplication: React.FC<MultiplicationProps> = ({times, controlMode}) => {
    return <>
        <FormItem name={['exercises', times, 0]} marginBottom="0.5rem">
            <InputNumber style={{width: '100%'}} placeholder="Введите первое число"/>
        </FormItem>
        {
            controlMode === 'multiplication' ?
                <Sign>×</Sign> :
                <Sign>÷</Sign>
        }
        <FormItem name={['exercises', times, 1]} marginBottom="0.5rem">
            <InputNumber style={{width: '100%'}} placeholder="Введите второе число"/>
        </FormItem>
    </>;
};

export default Multiplication;