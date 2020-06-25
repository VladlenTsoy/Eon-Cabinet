import React, {useEffect} from 'react';
import styled from "styled-components";
import BgRays from "./layouts/bg-rays/BgRays";
import LeftBlock from "./left-block/LeftBlock";
import RightBlock from "./right-block/RightBlock";
import MiddleBlock from "./middle-block/MiddleBlock";

const ResultWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background: ${props => props.theme['@layout-body-background']};
  overflow-y: auto;

  .result-info{
    position: relative;
    padding: 1.5rem;
    min-height: 100%;
    display: grid;
    
    @media (max-width: 768px) {
      padding: 1rem;
    }

    @media (max-width: 576px) {
      padding: .5rem;
    }
    
    > .container{
      max-width: 1350px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
      display: grid;
      grid-template-columns: 1fr 1.5fr 1fr;
      align-items: center;
      height: 100%;
      gap: 1.5rem;
      width: 100%;
      
      @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr;
      }  
      
      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }
  }
`;

interface ResultProps {
    loading: boolean;
    result: boolean;
    left: React.ReactNode;
    right: React.ReactNode;
    middle: React.ReactNode;
}

const ResultLayout: React.FC<ResultProps> = (
    {
        loading,
        result,
        left,
        right,
        middle,
    }
) => {
    useEffect(() => {
        document.getElementsByClassName('ant-layout-content')[0].scrollTo(0, 0);
    }, []);

    return <ResultWrapper>
        <div className="result-info">
            <BgRays
                delay={2500}
                loading={loading}
                color={result ? 'rgba(255, 175, 56, 0.2)' : 'rgba(0,0,0,0.02)'}
            />
            <div className="container">
                <LeftBlock>
                    {left}
                </LeftBlock>
                <MiddleBlock>
                    {middle}
                </MiddleBlock>
                <RightBlock>
                    {right}
                </RightBlock>
            </div>
        </div>
    </ResultWrapper>;
};

export default ResultLayout;