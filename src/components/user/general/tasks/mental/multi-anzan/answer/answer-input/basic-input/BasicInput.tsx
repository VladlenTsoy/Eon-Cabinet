import React from 'react';
import {FormItem} from "../../../../../../../../../layouts/components";
import styled from "styled-components";
import {Typography} from "antd";

const {Title} = Typography;

export const BasicWrapper = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  text-align: center;
  
  .wait{
    font-size: 3.5vw;
    font-weight: 600;
    color: ${props => props.theme.color_minimal};
  }
  
  input{
    text-align: center;
  }
`;

interface BasicInputProps {
    form: any
    isWait: boolean;
    taskKey: number;
}

const BasicInput: React.FC<BasicInputProps> = (
    {
        form,
        isWait,
        taskKey
    }
) => {
    return <BasicWrapper>
        {isWait ?
            <div className="wait">
                Ожидание...
            </div> :
            <>
                <Title level={2}>Пользователь №{taskKey + 1}</Title>
                <FormItem
                    form={form}
                    size="large"
                    autofocus={taskKey === 0}
                    placeholder={`Ответ`}
                    name={`answer[${taskKey}]`}
                    required={`Введите ответ пользователя №${taskKey + 1}`}
                />
            </>}
    </BasicWrapper>;
};

export default BasicInput;