import React from 'react';
import {InputNumber} from "antd";
import {FormItem} from "lib/components";
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
    mode: string;
}

const Multiplication: React.FC<MultiplicationProps> = ({tableKey, rowKey, columnKey, mode}) => {
    return <>
        <FormItem
            name={['exercises', tableKey, rowKey, columnKey, 0]}
            marginBottom="0.5rem"
            requiredMsg="Введите первое число!"
        >
            <InputNumber
                size="large"
                placeholder="Первое число"
                style={{width: '100%', minWidth: '100px'}}
            />
        </FormItem>
        {
            mode === 'multiply' ?
                <Sign>×</Sign> :
                <Sign>÷</Sign>
        }
        <FormItem
            name={['exercises', tableKey, rowKey, columnKey, 1]}
            marginBottom="0.5rem"
            requiredMsg="Введите второе число"
        >
            <InputNumber
                size="large"
                placeholder="Второе число"
                style={{width: '100%', minWidth: '100px'}}
            />
        </FormItem>
    </>;
};

export default Multiplication;