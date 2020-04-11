import React, {useEffect, useState} from 'react';
import styled from "styled-components";

interface StyledProps {
    duration: number;
}

const Wrapper: React.FC<StyledProps> = styled.div<StyledProps>`
    display: inline-block;
    animation-duration: ${props => props.duration}ms;
    animation-fill-mode: both;
    animation-name: pulse;
`;

interface CountActiveProps {
    success: number;
    sound: HTMLAudioElement;
    handlerError: (e: any) => void;
}

const CountActive: React.FC<CountActiveProps> = ({success, sound, handlerError}) => {
    const [successCount, setSuccessCount] = useState(0);

    useEffect((i = 0) => {
        const interval: any = setInterval(() => {
            if (i >= success)
                return clearInterval(interval);

            setSuccessCount(++i);
            sound.currentTime = 0;
            sound.play().catch(handlerError);
        }, 2000 / success);

        if (i < success) {
            setSuccessCount(++i);
            sound.currentTime = 0;
            sound.play().catch(handlerError);
        } else
            clearInterval(interval);

        return () => {
            clearInterval(interval);
        }
    }, [handlerError, sound, success]);

    return <Wrapper duration={2000 / success} key={successCount}>
        {successCount < 10 ? '0' + successCount : successCount}
    </Wrapper>;
};

export default CountActive;