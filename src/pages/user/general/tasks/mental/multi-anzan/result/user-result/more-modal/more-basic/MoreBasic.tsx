import React from 'react';
import styled from "styled-components";
import { TrophyOutlined } from '@ant-design/icons';

const BasicWrapper: any = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0 1rem;
  // background: ${props => props.theme['@background-color-base']};
  
  :not(:last-child) {
    margin-bottom: 1rem;
    border-bottom: 1px solid ${props => props.theme['@background-color-base']};
  }

  .title{
    color: ${props => props.theme.color_second};
  }
 
  .answer{
    // background: ${props => props.theme['@component-background']};
    text-align: center;
 
    
    .desc{
      font-size: 4vw;
      line-height: 1.5;
    }
    
    .trophy{
      color: ${(props: any) => props.result === 'true' ? props.theme.color_warning : props.theme.color_minimal};
    }
  }
  
  .exercise{
    // background: ${props => props.theme['@component-background']};
    grid-column-start: 1;
    grid-column-end: 4;
    text-align: center;
    padding-top: 0.5rem;
    max-width: 500px;
        
    .desc{
      font-size: 2.5vw;
      
      p{
        margin: 0;      
      }
    }
  }
`;

interface MoreBasicProps {
    result: boolean;
    answer: any;
    user: any;
    exercise: any;
}

const MoreBasic: React.FC<MoreBasicProps> = ({result, answer, user, exercise}) => {
    return (
      <BasicWrapper result={result.toString()}>
          <div className="answer">
              <div className="title">Результат</div>
              <div className="desc trophy"><TrophyOutlined /></div>
          </div>
          <div className="answer">
              <div className="title">Правильный ответ</div>
              <div className="desc">{answer}</div>
          </div>
          <div className="answer">
              <div className="title">Ответ ученика</div>
              <div className="desc">{user}</div>
          </div>
          <div className="exercise">
              <div className="title">Пример</div>
              <div className="desc">
                  <p>{exercise}</p>
              </div>
          </div>
      </BasicWrapper>
    );
};

export default MoreBasic;