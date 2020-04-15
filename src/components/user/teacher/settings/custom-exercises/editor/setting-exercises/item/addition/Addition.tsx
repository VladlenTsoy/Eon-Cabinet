import React, {useState} from 'react';
import {Button, InputNumber} from "antd";
import {FormItem} from "layouts/components";
import {PlusOutlined, DeleteOutlined} from "@ant-design/icons";
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
    tableKey: number;
    rowKey: number;
    columnKey: number;
}

const Addition: React.FC<AdditionProps> = ({tableKey, rowKey, columnKey}) => {
    const [inputs, setInputs] = useState<number[]>([]);

    const onClickHandler = () =>
        setInputs((prevState) => [...prevState, 1]);

    const onDeleteHandler = (_key: number) =>
        setInputs((prevState) => prevState.filter((input, key) => key !== _key));

    return <>
        {
            inputs.map((input: any, key: number) =>
                <InputWrapper key={key}>
                    <FormItem name={['exercises', tableKey, rowKey, columnKey, key]}
                              requiredMsg={`Введите число #${key + 1}!`}
                              marginBottom="0.5rem">
                        <InputNumber style={{width: '100%'}} placeholder={`Введите число #${key + 1}`} size="large"/>
                    </FormItem>
                    {
                        inputs.length === key + 1 ?
                            <Button type="danger" icon={<DeleteOutlined/>} shape="circle-outline"
                                    onClick={() => onDeleteHandler(key)}/> : null
                    }
                </InputWrapper>
            )
        }
        <Button type="dashed" block onClick={onClickHandler} icon={<PlusOutlined/>}>
            Добавить
        </Button>
    </>;
};

export default Addition;