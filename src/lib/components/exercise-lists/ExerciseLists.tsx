import React from 'react';
import {DeleteOutlined} from '@ant-design/icons';
import {Button} from "antd";
import styled from "styled-components";
import AnzanSettingBlock from "./exercise-blocks/mental/anzan-setting/AnzanSettingBlock";
import ModsConfig from "./exercise-blocks/config/ModsConfig";
import {TableSettingWrapper} from "./exercise-blocks/TableSettingWrapper";
import FlashAnzanSettingBlock from "./exercise-blocks/mental/flash-anzan-setting/FlashAnzanSettingBlock";
import SpecialSettingBlock from "./exercise-blocks/mental/special-anzan-setting/SpecialSettingBlock";
import ProgressionSettingBlock from "./exercise-blocks/mental/progression-setting/ProgressionSettingBlock";
import WordListSettingBlock from "./exercise-blocks/mnemonics/word-list-setting/WordListSettingBlock";
import DigitalRowSettingBlock from "./exercise-blocks/mnemonics/digital-row-setting/DigitalRowSettingBlock";
import NumbersSettingBlock from "./exercise-blocks/mnemonics/numbers-setting/NumbersSettingBlock";
import PersonalitiesSettingBlock from "./exercise-blocks/mnemonics/personalities-setting/PersonalitiesSettingBlock";
import MasterSystemSettingBlock from "./exercise-blocks/mnemonics/master-system-setting/MasterSystemSettingBlock";
import CountriesSettingBlock from "./exercise-blocks/mnemonics/countries-setting/CountriesSettingBlock";
import DigitalPictureSettingBlock from "./exercise-blocks/mnemonics/digital-picture-setting/DigitalPictureSettingBlock";
import CustomExercisesSettingBlock from "./exercise-blocks/mental/custom-exercises-setting/CustomExercisesSettingBlock";
import {useLanguage} from "../../../hooks/use-language"

const ExerciseTitleWrapper = styled.div`
  text-align: center;
  position: relative;
  
  h2{
    font-weight: 900;
  }
  
  button{
    position: absolute;
    right: 0;
    top: 4px;
  }
`;

interface ExerciseWrapperProps {
    exercise: any;
    edit?: boolean;
    deleteExercise?: any;
}

const ExerciseLists: React.FC<ExerciseWrapperProps> = ({exercise, deleteExercise, edit}) => {
    const {l} = useLanguage()
    const outputSetting = () => {
        let setting;
        switch (exercise.task_id) {
            case 1:
            case 3:
            case 2:
            case 23:
            case 4:
                setting = <AnzanSettingBlock setting={exercise.settings}/>;
                break;
            case 6:
                setting = <FlashAnzanSettingBlock setting={exercise.settings}/>;
                break;
            case 17:
                setting = <SpecialSettingBlock setting={exercise.settings}/>;
                break;
            case 22:
                setting = <ProgressionSettingBlock setting={exercise.settings}/>;
                break;
            case 24:
                setting = <CustomExercisesSettingBlock setting={exercise.settings}/>;
                break;

            //

            case 7:
            case 15:
                setting = <WordListSettingBlock setting={exercise.settings}/>;
                break;
            case 10:
                setting = <DigitalRowSettingBlock setting={exercise.settings}/>;
                break;
            case 12:
            case 16:
                setting = <NumbersSettingBlock setting={exercise.settings}/>;
                break;
            case 8:
                setting = <PersonalitiesSettingBlock setting={exercise.settings}/>;
                break;
            case 11:
                setting = <MasterSystemSettingBlock setting={exercise.settings}/>;
                break;
            case 9:
                setting = <CountriesSettingBlock setting={exercise.settings}/>;
                break;
            case 19:
                setting = <DigitalPictureSettingBlock setting={exercise.settings}/>;
                break;
        }

        return [
            <TableSettingWrapper key="setting">
                <tbody>
                {setting}
                </tbody>
            </TableSettingWrapper>,
            exercise.settings.extra ? <ModsConfig setting={exercise.settings} key="mods"/> : null,
        ]
    };

    return (
        <ExerciseTitleWrapper>
            <h2>{l('taskNames')[exercise.task.discipline_id][exercise.task.title]}</h2>
            {outputSetting()}
            {edit ?
                <Button danger size="small" icon={<DeleteOutlined/>} onClick={deleteExercise}/> :
                null}
        </ExerciseTitleWrapper>
    );
};

export default ExerciseLists;