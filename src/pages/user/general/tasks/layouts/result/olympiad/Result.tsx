import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {withRouter,RouteComponentProps} from "react-router";
import BgRays from "lib/layouts/result/layouts/bg-rays/BgRays";
import LeftBlock from "./left-block/LeftBlock";
import WaitingResult from "./waiting-result/WaitingResult";
import TaskSuccessSVG from "../../../../../../../assets/images/olympiad/task_success.svg";
import {usePreloadSounds} from "../../../../../../../hooks/use-preload-sounds.effect";

const PointSound = require('assets/sounds/olympiad/export_1.wav');
const WinSound = require('assets/sounds/win.mp3');
const LossSound = require('assets/sounds/loss.mp3');
const IncompleteSound = require('assets/sounds/olympiad/incomplete-step.wav');
const CompleteSound = require('assets/sounds/olympiad/complete-step.mp3');

const ResultWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background: ${props => props.theme['@layout-body-background']};

  .result-info{
    position: relative;
    padding: 1.5rem;
    min-height: 100%;
    
    @media (max-width: 768px) {
      padding: 1rem;
    }

    @media (max-width: 576px) {
      padding: .5rem;
    }
    
    > .container{
      position: relative;
      z-index: 10;
      display: grid;
      grid-template-columns: 1fr 1.5fr 1fr;
      align-items: center;
      height: 100%;
      gap: 1.5rem;
      
      @media (max-width: 992px) {
        grid-template-columns: 1fr 1fr;
      }  
      
      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export interface RouteOlympiadTaskProps {
    sentOlympiadId?: string,
    taskOlympiadId?: string
    taskId?: string
}

type ResultProps = RouteComponentProps<RouteOlympiadTaskProps>;

const Result: React.FC<ResultProps> = ({children}) => {
    const [loadingResult, setLoadingResult] = useState(true);
    const [pictureLoading, setPictureLoading] = useState(true);
    const [soundsLoading, sounds] = usePreloadSounds({
        point: new Audio(PointSound),
        win: new Audio(WinSound),
        lose: new Audio(LossSound),
        incomplete: new Audio(IncompleteSound),
        complete: new Audio(CompleteSound),
    });
    let loading = pictureLoading || loadingResult || soundsLoading;

    useEffect(() => {
        const layout = document.querySelector('.ant-layout-content');
        layout && layout.scrollIntoView();
    }, []);

    useEffect(() => {
        let img = new Image();
        img.onload = () => {
            setPictureLoading(false);
        };
        img.src = TaskSuccessSVG;
    }, []);

    return <ResultWrapper>
        <div className="result-info">
            <BgRays loading={loading}/>
            <div className="container">
                <LeftBlock>
                    {children}
                </LeftBlock>
                <WaitingResult
                    sounds={sounds}
                    loading={loading}
                    setLoadingResult={setLoadingResult}
                />
            </div>
        </div>
    </ResultWrapper>;
};

export default withRouter(Result);