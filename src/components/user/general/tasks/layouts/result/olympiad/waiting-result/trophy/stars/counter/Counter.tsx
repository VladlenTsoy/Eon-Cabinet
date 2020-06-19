import React, {useEffect} from 'react';
import styled from "styled-components";
import {useAddTimeout} from "../../../../../../../../../../../hooks/use-add-timeout.effect";
import CountActive from "../../counter/count-active/CountActive";

interface StyledProps {
    checkResult: boolean;
}

const Wrapper: React.FC<StyledProps> = styled.div<StyledProps>`
    position: relative;
    font-weight: 600;
    line-height: 1;
    color: ${props => props.theme.color_second};
    
    .counts{
      animation-fill-mode: both;
      animation: fadeOutUp 0.5s 3s forwards, fadeInUp 0.5s 6.1s forwards;
      font-size: 33px;
    
      .slash{
        color: ${props => props.theme.color_minimal};
        margin: 0 0.5rem;
      }
    }
    
    .text{
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      opacity: 0;
      font-size: ${props => props.checkResult ? '30px' : '20px'};
      animation-fill-mode: both;
      animation: fadeInDown 0.3s 3.3s forwards, ${props => props.checkResult ? 'tada' : 'shake'} 1.5s 3.6s, fadeOutDown 0.5s 5.6s forwards;  
    }
`;

interface CounterProps {
    result: boolean;
    handlerError: (error: any) => void;
    stats: {
        all: number;
        success: number;
    };
    sound: HTMLAudioElement;
    resultSound: HTMLAudioElement;
}

const Counter: React.FC<CounterProps> = (
    {
        stats,
        handlerError,
        result,
        sound,
        resultSound
    }
) => {
    const [addTimeout] = useAddTimeout();


    useEffect(() => {
        addTimeout([
            setTimeout(() => resultSound.play().catch(handlerError), 3600)
        ]);
    }, [addTimeout, handlerError, resultSound]);

    return <Wrapper checkResult={result}>
        <div className="counts">
            <CountActive success={stats.success} sound={sound} handlerError={handlerError}/>
            <span className="slash">/</span>
            {stats.all < 10 ? '0' + stats.all : stats.all}
        </div>
        <div className="text">
            {result ? 'Победа!' : 'Поражение!'}
        </div>
    </Wrapper>;
};

export default React.memo(Counter);