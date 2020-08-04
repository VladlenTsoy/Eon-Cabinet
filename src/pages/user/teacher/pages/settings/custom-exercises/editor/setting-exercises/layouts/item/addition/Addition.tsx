import React from 'react';
import {InputNumber} from "antd";
import {FormItem} from "lib/components";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  
  .ant-btn{
    margin-bottom: 0.5rem;
  }
  
  .ant-form-item{
    margin-right: 0.5rem;
    width: 100%;
  }
`;

interface AdditionProps {
    setupSetting: any;
    tableKey: number;
    rowKey: number;
    columnKey: number;
}

const Addition: React.FC<AdditionProps> = ({tableKey, rowKey, columnKey, setupSetting}) => {
    return <>
        {
            Array(setupSetting.count).fill(1)
                .map((input: any, key: number) =>
                    <InputWrapper key={key}>
                        <FormItem
                            name={['exercises', tableKey, columnKey, rowKey, key]}
                            requiredMsg={`Введите число #${key + 1}!`}
                            marginBottom="0.5rem"
                        >
                            <InputNumber
                                style={{width: '100%'}}
                                placeholder={`Введите число #${key + 1}`}
                                size="large"
                            />
                        </FormItem>
                    </InputWrapper>
                )
        }
    </>;
};

export default Addition;