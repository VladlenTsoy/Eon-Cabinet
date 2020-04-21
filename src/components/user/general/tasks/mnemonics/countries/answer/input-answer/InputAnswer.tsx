import React from 'react';
import styled from "styled-components";
import {FormItem} from "../../../../../../../../layouts/components";
import {useSelector} from "react-redux";

const InputWrapper = styled.div`
  display: grid;
  text-align: left;
  grid-gap: 1rem;
  grid-template-columns: 200px 1fr;
  align-items: center;
  
  @media (max-width: 576px) {
    grid-template-columns: 100px 1fr;
  }
  
  .flag{
    width: 200px;
    height: 110px;
    border-radius: 10px;
    overflow: hidden;
    
    img{
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    
    @media (max-width: 576px) {
      width: 100px;
      height: 60px;
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

const InputAnswer: React.FC<InputAnswerProps> = ({total, totalKey}) => {
    const {game} = useSelector((state: any) => state);
    const {setting} = game;

    return <InputWrapper>
        <div className="flag">
            <img src={total.exercise.url_flag} alt=""/>
        </div>
        <div className="content">
            <FormItem
                label={`Страна №${totalKey + 1}`}
                name={['answer', totalKey, 'country']}
                size="large"
                placeholder="Название"
                marginBottom="0"
                autofocus={totalKey === 0}
            />
            {Number(setting.mode) > 1 ?
                <FormItem
                    name={['answer', totalKey, 'capital']}
                    placeholder="Столица"
                    marginBottom="0"
                /> : null}
        </div>
    </InputWrapper>;
};

export default InputAnswer;