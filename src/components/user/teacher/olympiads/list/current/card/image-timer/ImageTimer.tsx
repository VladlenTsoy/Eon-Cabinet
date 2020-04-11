import React from 'react';
import OlympiadImage from "../../../../../../../../assets/images/icons/winner.svg";
import Timer from "react-compound-timer";
import moment from "moment";
import styled from "styled-components";
import TextFit from "../../../../../training/tasks/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";

const TimerWrapper = styled.div`
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    
    @media (max-width: 576px) {
      margin: 0 1.5rem 1rem;
    }
    
    img{
      width: 90%;
      background: ${props => props.theme.gradient_primary};
      box-shadow: ${props => props.theme.shadow_primary};
      border-radius: 50%;
    }
    
    .timer-text{
      position: absolute;
      top: calc(50% - 15px);
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;

      .timer-fit{
        white-space: nowrap;
        width: 85%;
        font-weight: 900;
        background: ${props => props.theme['@body-background']};
        padding: 0.5rem 1rem;
        border-radius: 40px;
        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
      }
    }
`;

interface ImageTimerProps {
    callback: () => void;
    endAt: any;
}

const ImageTimer: React.FC<ImageTimerProps> = ({callback, endAt}) => {
    return <TimerWrapper>
        <img src={OlympiadImage} alt="oly"/>
        <div className="timer-text">
            <div className="timer-fit">
                <TextFit widthOnly>
                    <div>
                        <Timer
                            formatValue={(value: any) => value < 10 ? `0${value}` : value}
                            initialTime={moment(endAt).valueOf() - moment().valueOf()}
                            direction="backward"
                            checkpoints={[
                                {
                                    time: 1000,
                                    callback: callback,
                                }
                            ]}
                        >
                            <Timer.Days/>д. <Timer.Hours/>:<Timer.Minutes/>:<Timer.Seconds/>
                        </Timer>
                    </div>
                </TextFit>
            </div>
        </div>
    </TimerWrapper>;
};

export default React.memo(ImageTimer);