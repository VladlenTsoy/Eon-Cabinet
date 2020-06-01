import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import BasicInput from "./basic-input/BasicInput";
import GroupInput from "./group-input/GroupInput";
import {gameSelector} from "../../../../../../../../store/reducers/common/game/gameSplice";

const AnswerWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 100%;
`;


interface AnswerInputProps {
    form: any;
    taskKey: number;
    isWait: boolean;
    isAnswersOpen: boolean,
}

const AnswerInput: React.FC<AnswerInputProps> = (
    {
        isWait,
        isAnswersOpen,
        taskKey
    }
) => {
    const {setting} = useSelector(gameSelector);

    return <AnswerWrapper>
        {setting.group ?
            <GroupInput isAnswersOpen={isAnswersOpen} taskKey={taskKey}/> :
            <BasicInput isWait={isWait} taskKey={taskKey}/>
        }
    </AnswerWrapper>;
};

export default AnswerInput;