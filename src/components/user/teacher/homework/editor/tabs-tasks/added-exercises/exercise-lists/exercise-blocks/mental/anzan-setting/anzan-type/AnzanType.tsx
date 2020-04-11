import React from 'react';
import styled from "styled-components";
import { BlockOutlined, FileOutlined, ThunderboltOutlined } from '@ant-design/icons';

const TdAnzanWrapper = styled.td`
   color: ${props => props.theme.color_warning} !important;
   font-size: 14px !important;
   text-align: center;
   font-weight: bold;
`;

interface AnzanTypeProps {
    setting: any,
}

const AnzanType:React.FC<AnzanTypeProps> = ({setting}) => {
    return (
        <tr>
            <TdAnzanWrapper colSpan={4}>
                {setting.anzan === 'double' ?
                    <>
                        <BlockOutlined /> Двойной
                    </> :
                    setting.anzan === 'turbo' ?
                        <>
                            <ThunderboltOutlined /> Турбо
                        </> :
                        setting.anzan === 'list' ?
                            <>
                                <FileOutlined /> Листы
                            </> :
                            'Обычный'
                }
            </TdAnzanWrapper>
        </tr>
    );
};

export default React.memo(AnzanType);