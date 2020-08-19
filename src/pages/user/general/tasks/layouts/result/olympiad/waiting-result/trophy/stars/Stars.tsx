import React from 'react';
import styled from "styled-components";
import ImageBlock from "./image/Image";
import Counter from "./counter/Counter";
import {LoadingBlock} from "lib/ui";

const Wrapper: React.FC = styled.div`
  padding: 0 1.5rem;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  margin: 0 auto;
  background: ${props => props.theme['@component-background']};
  border-radius: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 220px;
  position: relative;
  z-index: 20;
  overflow: hidden;

  top: 0;
  transform: scale(1);
  
  animation: 7s zoomResultStarts ease-in-out forwards;    
  
  @keyframes zoomResultStarts {    
    0%, 95% {
      top: -250px;
      transform: scale(5);
    }
  }
  
  @media (max-width: 1200px) {
    @keyframes zoomResultStarts {    
      0%, 95% {
        top: -250px;
        transform: scale(4);
      }
    }  
  }
  
  @media (max-width: 992px) {
    @keyframes zoomResultStarts {    
      0%, 95% {
        top: -250px;
        transform: scale(3.5);
      }
    }
  }
  
  @media (max-width: 768px) {
    @keyframes zoomResultStarts {    
      0%, 95% {
        top: -250px;
        transform: scale(2.5);
      }
    }
  }
    
  @media (max-width: 576px) {
    @keyframes zoomResultStarts {    
      0%, 95% {
        top: -250px;
        transform: scale(1.5);
      }
    }
  }
  
  .container{
    display: grid;
    grid-template-columns: 33% 67%;
    grid-gap: 0.5rem;
    align-items: center;
  }
`;

interface StarsProps {
    sounds: { [key: string]: HTMLAudioElement };
    result: boolean;
    loading: boolean;
    handlerError: (error: any) => void;
    stats: {
        all: number;
        success: number;
    };
}

const Stars: React.FC<StarsProps> = (
    {
        result,
        handlerError,
        loading,
        stats,
        sounds
    }
) => {
    if (loading)
        return <LoadingBlock title={null}/>;

    return <Wrapper>
        <div className="container">
            <ImageBlock
                result={result}
                percent={stats.success / stats.all * 100}
            />
            <Counter
                handlerError={handlerError}
                stats={stats}
                result={result}
                sound={sounds.point}
                resultSound={result ? sounds.win : sounds.lose}
            />
        </div>
    </Wrapper>;
};

export default Stars;