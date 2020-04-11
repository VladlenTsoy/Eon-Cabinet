import React, {useState} from 'react';
import styled from "styled-components";
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import MultiplicationBlock from "./multiplication-block/MultiplicationBlock";
import AdditionBlock from "./addition-block/AdditionBlock";
import EditorExercises from "../header-block/editor-exercise/EditorExercises";

const ExerciseSettingWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px dashed ${props => props.theme.color_border};
  border-radius: 10px;
`;

const DeleteExercise = styled.div`
  padding: 0.5rem;
  position: absolute;
  border-radius: 50%;
  background: ${props => props.theme.color_border};
  cursor: pointer;
  display: flex;
  top: -15px;
  right: -8px;
  z-index: 5;
  transition: all 0.3s ease-in-out;
  
  :hover{
    background: ${props => props.theme.color_danger};
  }
`;

const EditExercise = styled(DeleteExercise)`
  right: 30px;
  
  :hover{
    background: ${props => props.theme.color_primary};
  }
`;

const ExerciseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
`;

const TimeWrapper = styled.div`
  display: flex;
  font-size: 18px;
  
  div{
    span{
      color: ${props => props.theme.color_second};
      margin-right: 0.5rem;
    }
  
    &:first-child{
      margin-right: 1rem;
    }
  }
`;

interface ExerciseSettingProps {
    keyId: any;
    setting: any;
    editExercise: (setting: any, key: number) => void;
    deleteExercise: any;
}

const ExerciseSetting: React.FC<ExerciseSettingProps> = (
    {
        keyId,
        setting,
        editExercise,
        deleteExercise
    }
) => {
    const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');

    const editHandler = (setting: any) => {
        editExercise(setting, keyId);
    };

    const deleteHandler = () => {
        deleteExercise(keyId)
    };

    return (
        <ExerciseSettingWrapper>
            <EditorExercises
                isEdit
                updateExercise={editHandler}
                mods={isMultiplication ? 'multiplication' : 'addition'}
                setting={setting}
            >
                <EditExercise>
                    <EditOutlined />
                </EditExercise>
            </EditorExercises>
            <DeleteExercise onClick={deleteHandler}>
                <CloseOutlined />
            </DeleteExercise>
            <ExerciseWrapper>
                {isMultiplication ?
                    <MultiplicationBlock setting={setting}/> :
                    <AdditionBlock setting={setting}/>
                }
                <TimeWrapper>
                    {isMultiplication ?
                        <div>
                            <span>Кол-во раз:</span>
                            {setting.times}
                        </div> :
                        <div>
                            <span>Кол-во:</span>
                            {setting.count}
                        </div>
                    }
                    <div>
                        <span>Время:</span>
                        {setting.time} с.
                    </div>
                </TimeWrapper>
            </ExerciseWrapper>
        </ExerciseSettingWrapper>
    );
};

export default ExerciseSetting;