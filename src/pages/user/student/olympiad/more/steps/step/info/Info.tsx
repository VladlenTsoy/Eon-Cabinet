import React from 'react';
import styled from "styled-components";
import TimerBlock from "./timer/Timer";
import Students from "./students/Students";
import Tasks from "./tasks/Tasks";

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.5rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }

`;

interface InfoProps {
    step: any;
}

const Info: React.FC<InfoProps> = ({step}) => {
    return <>
        <InfoWrapper>
            <Tasks step={step}/>
            <Students step={step}/>
            <TimerBlock step={step}/>
        </InfoWrapper>
    </>;
};

export default Info;