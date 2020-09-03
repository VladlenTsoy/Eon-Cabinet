import React, {useState} from 'react';
import {useAppContext} from "store/context/use-app-context";
import AnzanType from "../anzan-setting/anzan-type/AnzanType";
import styled from "styled-components";

const TitleWrapper = styled.div`
  font-size: 18px;
  text-align: center;
  margin: 0 0 5px;
`;

interface CustomExercisesSettingBlockProps {
    setting: any;
}

const CustomExercisesSettingBlock: React.FC<CustomExercisesSettingBlockProps> = ({setting}) => {
    const {language} = useAppContext();
    const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');

    return <>
        <tr>
            <td colSpan={5}>
                <TitleWrapper>{setting.title} <small>(ID: {setting.custom_exercises_id})</small></TitleWrapper>
            </td>
        </tr>
        <AnzanType setting={setting}/>
        <>
            {isMultiplication ?
                <tr>
                    <td>Режим:</td>
                    <td>
                        {language.common.modeNames[setting.mode]}&nbsp;
                    </td>
                    {setting.anzan === 'list' ?
                        <>
                            <td>Таблиц:</td>
                            <td>{setting.tables}</td>
                        </> :
                        <td colSpan={2}/>
                    }
                </tr> : [
                    <tr key="mode">
                        <td>Мод:</td>
                        <td><b>{language.common.modeNames[setting.mode]}</b></td>
                        {setting.anzan === 'list' ?
                            <>
                                <td>Таблиц:</td>
                                <td>{setting.tables}</td>
                            </> :
                            <>
                                <td>Кол-во:</td>
                                <td>{setting.count}</td>
                            </>
                        }
                    </tr>
                ]}
            {setting.anzan === 'list' ?
                <tr>
                    <td>Столбцов:</td>
                    <td>{setting.column}</td>
                    <td>Строк:</td>
                    <td>{setting.rows}</td>
                </tr> :
                <tr>
                    <td>Кол-во раз:</td>
                    <td>{setting.times}</td>
                    <td>Время:</td>
                    <td>{setting.time} с.</td>
                </tr>
            }
            {
                !isMultiplication && setting.anzan === 'list' ?
                    <tr>
                        <td>Время:</td>
                        <td>{setting.time} м.</td>
                        <td/>
                        <td/>
                    </tr> :
                    null
            }

        </>
    </>
};

export default CustomExercisesSettingBlock;