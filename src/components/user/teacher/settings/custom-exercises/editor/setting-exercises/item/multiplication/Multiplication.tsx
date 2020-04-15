import React from 'react';
import {InputNumber} from "antd";
import {FormItem} from "lib";
import styled from "styled-components";

const Sign = styled.p`
  font-size: 30px;
  line-height: 1;
  margin-bottom: 0.5rem;
`;

interface MultiplicationProps {
    tableKey: number;
    rowKey: number;
    columnKey: number;
    controlMode: string;
}

const Multiplication: React.FC<MultiplicationProps> = ({tableKey, rowKey, columnKey, controlMode}) => {
    return <>
        <FormItem name={['exercises', tableKey, rowKey, columnKey, 0]} marginBottom="0.5rem"
                  requiredMsg="Введите первое число!">
            <InputNumber style={{width: '100%'}} placeholder="Введите первое число" size="large"/>
        </FormItem>
        {
            controlMode === 'multiplication' ?
                <Sign>×</Sign> :
                <Sign>÷</Sign>
        }
        <FormItem name={['exercises', tableKey, rowKey, columnKey, 1]} marginBottom="0.5rem"
                  requiredMsg="Введите второе число">
            <InputNumber style={{width: '100%'}} placeholder="Введите второе число" size="large"/>
        </FormItem>
    </>;
};

export default Multiplication;