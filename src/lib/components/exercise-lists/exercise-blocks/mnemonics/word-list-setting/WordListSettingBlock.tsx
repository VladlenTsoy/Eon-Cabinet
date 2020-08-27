import React from 'react';
import styled from "styled-components";
import { FileOutlined } from '@ant-design/icons';
import {useLanguage} from "../../../../../../hooks/use-language";

const TdAnzanWrapper = styled.td`
   color: ${props => props.theme.color_warning} !important;
   font-size: 14px !important;
   text-align: center;
   font-weight: bold;
`;

interface WordListSettingBlockProps {
    setting: any;
}

const WordListSettingBlock: React.FC<WordListSettingBlockProps> = ({setting}) => {
    const {language} = useLanguage();
    return <>
        <tr>
            <TdAnzanWrapper colSpan={6}>
                {
                    setting.mode === 'list' ?
                        <>
                            <FileOutlined /> Листы
                        </> :
                        'Обычный'
                }
            </TdAnzanWrapper>
        </tr>
        {Object.values(setting.several).map((value: any, key) =>
            <tr key={key}>
                <td className="text-mute">Мод:</td>
                <td>{language.common.tasksTraining.wordsList.mode[value.mode]}</td>
                <td className="text-mute">Режим:</td>
                <td>{language.common.tasksTraining.wordsList.type[value.type]}</td>
                <td className="text-mute">Кол-во:</td>
                <td>{value.count}</td>
            </tr>
        )}
        <tr>
            <td className="text-mute">Время:</td>
            <td>{setting.time} мин.</td>
            <td/>
            <td/>
            <td/>
            <td/>
        </tr>
    </>;
};

export default WordListSettingBlock;