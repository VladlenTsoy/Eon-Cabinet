import React from 'react';
import {FormItem, Title} from "lib/ui";
import styled from "styled-components";

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
    isWait: boolean;
    taskKey: number;
}

const BasicInput: React.FC<BasicInputProps> = (
    {
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
                    size="large"
                    autofocus={taskKey === 0}
                    placeholder={`Ответ`}
                    name={['answer', taskKey]}
                    requiredMsg={`Введите ответ пользователя №${taskKey + 1}`}
                />
            </>}
    </BasicWrapper>;
};

export default BasicInput;