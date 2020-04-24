import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import {Card} from "lib";
import {useAddTimeout} from "../../../../../../../effects/use-add-timeout.effect";
import TextFit
    from "../../../../../teacher/training/tasks/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";

const PreparationWrapper = styled(Card)`
  &.ant-card{
    height: 100%;
    margin-bottom: 0;
    
    .ant-card-body{
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const OutputWrapper = styled.div`
  width: 70%;
  text-align: center;
  
  .output{
    height: 250px;
    white-space: nowrap;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: PreparationFade 0.5s ease-in-out;
  }

  @keyframes PreparationFade{
    0%{
      transform: scale(1);
    }
    100%{
      transform: scale(1);
    }
  }
`;

const PreparationLayout: React.FC = ({children}) => {
    const [startApplication, setStartApplication] = useState(false);
    const [output, setOutput] = useState('На старт');

    const [addTimeout] = useAddTimeout();

    // Start Application
    const startPreparation = useCallback(() => {
        setOutput('На старт');
        addTimeout([
            setTimeout(() => setOutput('Внимание'), 1000),
            setTimeout(() => setOutput('Марш'), 2000),
            setTimeout(() => setStartApplication(true), 3000),
        ]);
    }, [addTimeout]);

    useEffect(() => {
        startPreparation();
    }, [startPreparation]);

    if (startApplication)
        return <>{children}</>;

    return <PreparationWrapper>
        <OutputWrapper>
            <TextFit key={output} isLoading>
                <div className="output">{output}</div>
            </TextFit>
        </OutputWrapper>
    </PreparationWrapper>;
};

export default PreparationLayout;