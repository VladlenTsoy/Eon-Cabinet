import React, {useEffect} from 'react';
import StepSuccessSVG from "assets/images/olympiad/step_success.svg";
import {GrayIcon} from "lib";
import {useScreenWindow} from "effects/use-screen-window.effect";
import {useAddTimeout} from "effects/use-add-timeout.effect";
import styled from "styled-components";

interface StyledProps {
    checkLoading: boolean;
}

const ImageWrapper: React.FC<StyledProps> = styled.div<StyledProps>`
    display: flex;
    justify-content: center;
    margin: 1rem auto 2rem;
    
    animation-name: ${props => props.checkLoading ? '' : 'pulse'};
    animation-delay: 7s;
    animation-duration: 0.5s;
    animation-fill-mode: both;
    position: relative;
    z-index: 6;
`;

interface ImageProps {
    loading: boolean;
    resultData: any;
    handlerError: (error: any) => void;
    sounds: { [key: string]: HTMLAudioElement };
}

const Image: React.FC<ImageProps> = ({loading, resultData, sounds, handlerError}) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});
    const [addTimeout] = useAddTimeout();

    useEffect(() => {
        if (!loading) {
            const result = resultData.exercises_all <= resultData.exercises_success;
            addTimeout([
                setTimeout(() =>
                        result ?
                            sounds.complete.play().catch(handlerError) :
                            sounds.incomplete.play().catch(handlerError),
                    7100)
            ]);
        }
    }, [addTimeout, handlerError, loading, resultData, sounds]);

    return <ImageWrapper checkLoading={loading}>
        <GrayIcon
            percent={loading ? 0 : resultData.exercises_success / resultData.exercises_all * 100}
            width={isBreakpoint ? '250px' : '300px'}
            alt="Результат"
            img={StepSuccessSVG}
        />
    </ImageWrapper>;
};

export default React.memo(Image);