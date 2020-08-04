import React from 'react';
import styled from "styled-components";
import moment from "moment";

interface StepsStyled {
    columns: string;
    progress: number;
}

const StepsWrapper: React.FC<StepsStyled> = styled.div<StepsStyled>`
  display: grid;
  grid-template-columns: ${props => props.columns};
  margin: 2rem 0;
  background: ${props => props.theme.light_color_border};
  border-radius: 50px;
  position: relative;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  overflow: hidden;
  
  ::after{
    content: "";
    position: absolute;
    left: 0;
    right: ${props => `${props.progress}%`};
    bottom: 0;
    top: 0;
    background: linear-gradient(to right, ${props => props.theme.color_warning}, ${props => props.theme.color_primary});
  }
    
  .step {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 5;
    
    .number {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: flex-end;
      line-height: 1.4;
      justify-content: center;
      border-radius: 50%;
      font-size: 35px;
      font-weight: 900;
      position: relative;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      transform: scale(0.9);

      ::after{
        content: "Этап";
        font-size: 12px;
        color: ${props => props.theme.color_second};
        position: absolute;
        top: 5px;
      }
      
      :hover{
        color: ${props => props.theme.color_black};
        background: ${props => props.theme['@component-background']};
        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1); 
      }
      
      
      &.active{
        color: ${props => props.theme.color_black};
        background: ${props => props.theme['@component-background']};
        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
        transform: scale(1);
      }
    }
    
    .date {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      color: rgba(255,255,255, 0.85);
      flex-direction: column;
      justify-content: center;
      
      > span {
        font-size: 16px;
        line-height: 1;
      }
      
      &.start{
        left: 20px;
      }
      
      &.end{
        right: calc(0% - 24px);
        
        @media (max-width: 576px) {
          right: 20px;
        }
      }
    }
    
    &:last-child{
      .date.end {
        right: 20px;
      }
    }
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-template-rows: ${props => props.columns};
  }
`;

interface StepsProps {
    olympiad: any;
    current: number;
    changeStep: (step: number) => void;
}

const Steps: React.FC<StepsProps> = (
    {
        olympiad,
        current,
        changeStep
    }
) => {
    const currentTime = moment().valueOf();
    const process = (currentTime - moment(olympiad.steps[0].start_at).valueOf()) / (moment(olympiad.steps[olympiad.steps.length - 1].end_at).valueOf() - moment(olympiad.steps[0].start_at).valueOf()) * 100;
    const revsProcess = 100 - process;

    return <StepsWrapper
        progress={revsProcess < 0 ? 0 : revsProcess > 100 ? 100 : revsProcess}
        columns={Array(olympiad.steps_count).fill('1fr').join(' ')}
    >
        {olympiad.steps.map((step: any) =>
            <div className="step" key={step.step}>
                {step.step === 0 ?
                    <div className="date start">
                        <span>{moment(step.start_at).format('HH:mm')}</span>
                        {moment(step.start_at).format('DD MMM')}
                    </div> : null
                }
                <div
                    onClick={() => changeStep(step.step)}
                    className={`number ${current === step.step ? 'active' : ''}`}
                >
                    {step.step + 1}
                </div>
                <div className="date end">
                    <span>{moment(step.end_at).format('HH:mm')}</span>
                    {moment(step.end_at).format('DD MMM')}
                </div>
            </div>
        )}
    </StepsWrapper>;
};

export default Steps;