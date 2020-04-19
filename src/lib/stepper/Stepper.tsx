import React from 'react';
import styled from "styled-components";
import {PlusOutlined, MinusOutlined} from "@ant-design/icons";

const StepperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper: any = styled.button<any>`
  border-radius: 10px;
  background: ${props => props.theme['@component-background']};
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  font-size: 25px;
  height: 50px;
  width: 50px;
  line-height: 46px;
  cursor: pointer;
  border: 2px solid ${props => props.theme['@component-background']};
  transition: all 0.2s ease-in-out;

  :focus{
    outline: none;
    border-color: ${props => props.theme.color_primary}40;
    color: ${props => props.theme.color_primary};
  }
  
  :hover{
    color: ${props => props.theme.color_primary};
  }
  
  :disabled{
    color: ${props => props.theme.light_color_border};
  }
  
  :active:not(:disabled){
    .anticon{
      animation: plus 0.3s ease-in-out forwards;
    }
  }
  
  @keyframes plus {
    0%{
      transform: scale(1);
    }
    40%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
  }
`;

const CounterWrapper = styled.div`
  max-width: 75px;
  text-align: center;
  width: 100%;
  font-size: 30px;
  line-height: 1;
    
  input{
    display: none;
  }
`;

interface StepperProps {
    id?: string;
    value?: number;
    onChange?: (val: number) => void;
    step?: number;
    min?: number;
    max?: number;
}

const Stepper: React.FC<StepperProps> = (
    {
        id,
        onChange,
        value = 0,
        step = 1,
        min,
        max,
    }
) => {
    const up = (val: number) => step < 1 ? Math.round((val) * 10) / 10 : Math.round(val);
    const plusHandler = () => onChange ? onChange(up(value + step)) : null;
    const minusHandler = () => onChange ? onChange(up(value - step)) : null;

    return <StepperWrapper>
        <ButtonWrapper type="button" onClick={minusHandler} disabled={min && value <= min}>
            <MinusOutlined/>
        </ButtonWrapper>
        <CounterWrapper>
            {value}
            <input type="number" id={id || undefined}/>
        </CounterWrapper>
        <ButtonWrapper type="button" onClick={plusHandler} disabled={max && value >= max}>
            <PlusOutlined/>
        </ButtonWrapper>
    </StepperWrapper>;
};

const areEqual = (prevProps: any, nextProps: any) => {
    return prevProps.value === nextProps.value;
};

export default React.memo(Stepper, areEqual);