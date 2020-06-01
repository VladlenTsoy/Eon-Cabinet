import React from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {gameSelector} from "../../../../../../../../../store/reducers/common/game/gameSplice";

const TextFontSetWrapper: any = styled.div<any>`
  color: ${props => props.isWait ? props.theme.color_minimal : props.isEven ? props.theme.color_main : props.theme.color_primary}
`;

interface TextFontSet {
    text: any;
    keyTask: number;
}

const TextFontSet: React.FC<TextFontSet> = ({text, keyTask}) => {
    const {setting} = useSelector(gameSelector);

    let fontSize: any = 1;
    let textLength = text ? String(text).replace(/\s/g, '').length : 'Ожидание...'.length;

    if (textLength < 3) {
        fontSize = 17;
    } else if (textLength === 3) {
        fontSize = 9;
    } else if (textLength === 4) {
        fontSize = 7.5;
    } else if (textLength === 5) {
        fontSize = 6.5;
    } else if (textLength === 6) {
        fontSize = 5.5;
    } else if (textLength === 7) {
        fontSize = 5;
    } else if (textLength === 8) {
        fontSize = 4.3;
    } else if (textLength === 9 || textLength === 10) {
        fontSize = 3.5;
    } else if (textLength === 11) {
        fontSize = 3.2;
    } else if (textLength === 12) {
        fontSize = 3;
    }

    if (setting.windows.length <= 4)
        fontSize = fontSize * 2;
    else if (setting.windows.length > 4 && setting.windows.length < 7)
        fontSize = fontSize * 1.3;

    if (fontSize > 12) fontSize = 12;

    fontSize = fontSize + 'vw';

    return <TextFontSetWrapper
        style={{
            fontSize
        }}
        isWait={!text}
        isEven={keyTask & 1}
    >
        {text || 'Ожидание...'}
    </TextFontSetWrapper>
};

export default TextFontSet;