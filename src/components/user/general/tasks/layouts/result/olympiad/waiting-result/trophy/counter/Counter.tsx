import React from 'react';
import styled from "styled-components";
import {LoadingBlock} from "lib";

interface StyledProps {

}

const Wrapper: React.FC<StyledProps> = styled.div<StyledProps>`
  > .title{
    font-size: 25px;
    line-height: 1;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.color_minimal};
  }
  
  > .counts {
    font-size: 50px;
    line-height: 1;
    color: ${props => props.theme.color_second};
    font-weight: bold;
    
    > .active{
      color: ${props => props.theme.color_warning};
    }
    
    > .slash{
      margin: 0 0.5rem;
      color: ${props => props.theme.color_minimal};
    }
  }
`;

interface CounterProps {
    loadingResult: boolean;
    resultData: any;
}

const Counter: React.FC<CounterProps> = ({loadingResult, resultData}) => {
    return <Wrapper>
        <div className="title">Этап #1</div>
        {
            loadingResult ?
                <LoadingBlock title={null}/> :
                <div className="counts">
                    <span className="active">{resultData.exercises_success}</span>
                    <span className="slash">/</span>
                    {resultData.exercises_all}
                </div>
        }
    </Wrapper>;
};

export default Counter;