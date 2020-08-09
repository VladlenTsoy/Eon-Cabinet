import React from 'react';
import { FileOutlined } from '@ant-design/icons';
import styled from "styled-components";
import {useLanguage} from "../../../../../../../../../../../../hooks/use-language";

const TdAnzanWrapper = styled.td`
   color: ${props => props.theme.color_warning} !important;
   font-size: 14px !important;
   text-align: center;
   font-weight: bold;
`;


interface NumbersSettingBlockProps {
    setting: any;
}

const NumbersSettingBlock:React.FC<NumbersSettingBlockProps> = ({setting}) => {
    const {language} = useLanguage();
    return <>
        <tr>
            <TdAnzanWrapper colSpan={6}>
                {
                    setting['task-mode'] === 'list' ?
                        <>
                            <FileOutlined /> Листы
                        </> :
                        'Обычный'
                }
            </TdAnzanWrapper>
        </tr>
        <tr>
            <td className="text-mute">Мод:</td>
            <td>{language.common.mnemonic2ModeNames[setting.mode]}</td>
            <td colSpan={2}/>
        </tr>
        <tr>
            <td className="text-mute">Кол-во:</td>
            <td>{setting.count}</td>
            <td className="text-mute">Время:</td>
            <td>{setting.time} с.</td>
        </tr>
        </>;
};

export default NumbersSettingBlock;