import React from 'react';
import EditorStepButton from "../../editor-step-button/EditorStepButton";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {Button} from "antd";
import styled from "styled-components";

const TitleWrapper = styled.div`
  line-height: 1;
  
  .sub-title-actions{
    display: flex;
    align-items: center;
          
    .sub-title{
      font-size: 12px;
      color: ${props => props.theme.color_second};
      display: inline-block;
      line-height: 1;
      margin-right: auto;
    }
    
    > span > button {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
  
  .title{
    display: block;
    line-height: 1.5;
  }
`;


interface TitleProps {
    step: any;
    stepKey: number;
    setSteps: (step: any) => void;
    deleteHandler: (key: number) => void;
    onChangeHandler: (current: any) => void;
}

const Title: React.FC<TitleProps> = (
    {
        step,
        stepKey,
        setSteps,
        deleteHandler,
        onChangeHandler
    }
) => {


    return (
        <TitleWrapper>
            <div className="sub-title-actions">
                <span className="sub-title">Этап №{stepKey + 1}</span>
                <EditorStepButton
                    first={true}
                    step={step}
                    stepKey={stepKey}
                    setCurrent={onChangeHandler}
                    setSteps={setSteps}
                >
                    <Button
                        icon={<EditOutlined />}
                        shape="circle-outline"
                        size="small"
                    />
                </EditorStepButton>
                <Button
                    icon={<DeleteOutlined />}
                    danger
                    shape="circle-outline"
                    size="small"
                    onClick={() => deleteHandler(stepKey)}
                />
            </div>
            <span className="title">{step.title}</span>
        </TitleWrapper>
    );
};

export default Title;