import React from 'react';
import {Typography} from 'antd';
import {Legend} from 'lib/ui';
import styled from "styled-components";
import Info from "./info/Info";
import Tasks from "./tasks/Tasks";

const {Title} = Typography;

const StepWrapper = styled.div`
  h2{
    text-align: center;
  }
`;

interface StepProps {
    currentStep: any;
}

const Step: React.FC<StepProps> = ({currentStep}) => {
    return <StepWrapper>
        <Title level={2}>{currentStep.title}</Title>
        <Info step={currentStep}/>
        <Legend>Задания</Legend>
        <Tasks currentStep={currentStep}/>
    </StepWrapper>;
};

export default Step;