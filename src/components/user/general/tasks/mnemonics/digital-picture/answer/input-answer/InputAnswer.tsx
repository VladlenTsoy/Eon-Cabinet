import React from 'react';
import styled from "styled-components";
import {FormItem} from "../../../../../../../../layouts/components";
import {InputNumber} from "antd";

const InputWrapper = styled.div`
  display: grid;
  text-align: left;
  grid-gap: 1rem;
  grid-template-columns: 250px 1fr;
  align-items: center;

  @media (max-width: 576px) {
    grid-template-columns: 120px 1fr;
  }


  .picture{
    width: 250px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;
    
    img{
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
    
    @media (max-width: 576px) {
      width: 120px;
      height: 90px;
    }
  }
  
  .content{
    width: 100%;
  }
`;

interface InputAnswerProps {
    total: any;
    totalKey: number;
}

const InputAnswer: React.FC<InputAnswerProps> = ({ total, totalKey}) => {
    return <InputWrapper>
        <div className="picture">
            <img src={total.exercise.url_picture} alt=""/>
        </div>
        <div className="content">
            <FormItem
                label={`Число №${totalKey + 1}`}
                name={`answer[${totalKey}][number]`}
                marginBottom="0"
                autofocus={totalKey === 0}
            >
                <InputNumber style={{width: '100%'}} size="large" placeholder="Число"/>
            </FormItem>
        </div>
    </InputWrapper>;
};

export default InputAnswer;