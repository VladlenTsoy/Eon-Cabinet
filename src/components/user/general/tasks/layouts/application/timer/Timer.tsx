import React from "react";
import Timer from "react-compound-timer";
import styled from "styled-components";
import { ClockCircleOutlined } from '@ant-design/icons';

const TimerWrapper = styled.div`
  position: fixed;
  right: 0;
  background: ${props => props.theme.gradient_danger};
  color: #ffffff;
  z-index: 5;
  top: 13%;
  padding: 0.25rem 0.5rem;
  font-weight: 900;
  font-size: 20px;
  border-radius: 10px 0 0 10px;
  
  i{
    margin-right: 0.5rem;
  }
`;

interface TimerBlockProps {
    time: any;
    callback: any;
}

const TimerBlock: React.FC<TimerBlockProps> = ({time, callback}) => {
    return (
        <TimerWrapper>
            <ClockCircleOutlined />
            <Timer
                formatValue={(value: any) => value < 10 ? `0${value}` : value}
                initialTime={60000 * time}
                direction="backward"
                checkpoints={[
                    {
                        time: 1000,
                        callback: callback,
                    }
                ]}
            >
                <Timer.Minutes/> : <Timer.Seconds/>
            </Timer>
        </TimerWrapper>
    );
};

export default React.memo(TimerBlock);