import React from 'react';
import TaskSuccessSVG from "assets/images/olympiad/task_success.svg";
import styled from "styled-components";
import {GrayIcon} from "lib/components";

interface ImageStyledProps {
    checkResult: boolean;
}

const ImageWrapper: React.FC<ImageStyledProps> = styled.div<ImageStyledProps>`
    animation-delay: 2s;
    animation-name: ${props => props.checkResult ? 'pulse' : ''};
    animation-duration: 0.5s;
    animation-fill-mode: both;
`;

interface ImageProps {
    result: boolean;
    percent: number;
}

const Image: React.FC<ImageProps> = ({result, percent}) => {
    return <ImageWrapper checkResult={result}>
        <GrayIcon percent={percent} width="100%" img={TaskSuccessSVG} alt="результат"/>
    </ImageWrapper>;
};

export default React.memo(Image);