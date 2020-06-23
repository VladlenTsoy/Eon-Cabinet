import React from 'react';
import styled from "styled-components";
import EditorStepButton from "../editor-step-button/EditorStepButton";
import { ArrowRightOutlined } from '@ant-design/icons';
import {Button} from "antd";
import ButtonSaveOlympiad from "./save/ButtonSaveOlympiad";

const ActionsWrapper = styled.div`
  > span:not(:last-child) > button {
    margin-bottom: 0.75rem;
  }
`;

interface ActionsProps {
    step?: any;
    steps: any[];
    olympiad?: any;
    exercises: any[];
    current: number;
    setCurrent: (current: any) => void;
    setSteps: (step: any) => void;
}

const Actions: React.FC<ActionsProps> = (
    {
        step,
        steps,
        current,
        exercises,
        olympiad,
        setSteps,
        setCurrent,
    }
) => {
    return (
        <ActionsWrapper>
            <EditorStepButton
                step={
                    step ? {
                        start_at: step.end_at,
                    } : null
                }
                stepKey={current}
                setSteps={setSteps}
                setCurrent={setCurrent}
            >
                <Button icon={<ArrowRightOutlined />} type="primary" block>Создать следующий этап</Button>
            </EditorStepButton>
            <ButtonSaveOlympiad
                steps={steps}
                exercises={exercises}
                olympiad={olympiad}/>
        </ActionsWrapper>
    );
};

export default Actions;