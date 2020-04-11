import React from 'react';
import styled from "styled-components";
import TextFit from "../../../../../teacher/training/tasks/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";
// @ts-ignore
// import {Textfit} from 'react-textfit';

export const BasicOutputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 400px;
  border-radius: 50%;
  animation: pulsar-primary 1s linear infinite;

  .text-output {
    width: 400px;
    white-space: nowrap;
    text-align: center;
    font-weight: bolder;
    background: none;
    
    //@keyframes flash {
    //   100% {
    //     color: #fff;
    //   }
    //   85%{
    //    color: inherit;
    //   }
    //   0%{
    //    color: inherit;
    //   }
    //}  
  }
 
  @media (max-width: 576px) {
    height: 250px;
    width: 250px;
  
    .text-output {
      width: 250px;
    }  
  }
 
  @keyframes pulsar-primary {
      100% {
        box-shadow: 0 0 3px 0 ${props => props.theme.color_primary};
      }
      0% {
        box-shadow: 0 0 170px 5px ${props => props.theme.color_primary};
      }
    }
    
    @keyframes pulsar-danger {
      to {
        box-shadow: 0 0 3px 0 ${props => props.theme.color_danger};
      }
      from {
        box-shadow: 0 0 170px 5px ${props => props.theme.color_danger};
      }
    }
`;

interface BasicOutputProps {
    output: string;
    state: string;
    setting: any;
    color?: string;
}

const BasicOutput: React.FC<BasicOutputProps> = ({output, state, setting, color}) => {
    return <BasicOutputWrapper
        key={output}
        className={`${color}`}
        style={{animation: `pulsar-${state === 'preparation' ? 'danger' : 'primary'} ${state === 'preparation' ? 1 : setting.time}s linear infinite`}}>
        <TextFit
            widthOnly
        >
            <div
                className="text-output"
                // style={{animation: `flash ${state === 'preparation' ? 1 : setting.time}s linear infinite`}}
            >
                {output}
            </div>
        </TextFit>
    </BasicOutputWrapper>
};

export default BasicOutput;