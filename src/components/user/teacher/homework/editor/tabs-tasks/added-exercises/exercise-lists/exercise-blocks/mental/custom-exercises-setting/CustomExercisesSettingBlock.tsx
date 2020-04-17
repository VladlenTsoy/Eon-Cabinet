import React, {useState} from 'react';
import {useSelector} from "react-redux";
import AnzanType from "../anzan-setting/anzan-type/AnzanType";
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import {LoadingBlock} from "lib";
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
    const {language} = useSelector((state: any) => state);
    const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');

    const [loading, exercises] = useApiUserGeneral({url: `/teacher/custom-exercises/${setting.custom_exercises_id}/setting`});

    if (loading)
        return <tr>
            <td colSpan={10}>
                <LoadingBlock/>
            </td>
        </tr>;

    let _setting = {...setting, ...exercises.setting};

    return <>
        <tr>
            <td colSpan={5}>
                <TitleWrapper>{exercises.title}</TitleWrapper>
            </td>
        </tr>
        <AnzanType setting={setting}/>
        <>
            {isMultiplication ?
                <tr>
                    <td>Режим:</td>
                    <td>
                        {language.common.modeNames[_setting.mode]}&nbsp;
                    </td>
                    {_setting.anzan === 'list' ?
                        <>
                            <td>Таблиц:</td>
                            <td>{_setting.tables}</td>
                        </> :
                        <td colSpan={2}/>
                    }
                </tr> : [
                    <tr key="mode">
                        <td>Мод:</td>
                        <td><b>{language.common.modeNames[_setting.mode]}</b></td>
                        {_setting.anzan === 'list' ?
                            <>
                                <td>Таблиц:</td>
                                <td>{_setting.tables}</td>
                            </> :
                            <>
                                <td>Кол-во:</td>
                                <td>{_setting.count}</td>
                            </>
                        }
                    </tr>
                ]}
            {_setting.anzan === 'list' ?
                <tr>
                    <td>Столбцов:</td>
                    <td>{_setting.column}</td>
                    <td>Строк:</td>
                    <td>{_setting.rows}</td>
                </tr> :
                <tr>
                    <td>Кол-во раз:</td>
                    <td>{_setting.times}</td>
                    <td>Время:</td>
                    <td>{_setting.time} с.</td>
                </tr>
            }
            {
                !isMultiplication && _setting.anzan === 'list' ?
                    <tr>
                        <td>Время:</td>
                        <td>{_setting.time} м.</td>
                        <td/>
                        <td/>
                    </tr> :
                    null
            }

        </>
    </>
};

export default CustomExercisesSettingBlock;