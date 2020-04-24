import React from "react";
import Timer from "react-compound-timer";
import styled from "styled-components";
import {ClockCircleOutlined} from '@ant-design/icons';
import {Modal} from "antd";
import {useDispatch} from "react-redux";
import {gameChangeStatus} from "../../../../../../../../store/game/actions";

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
  
  .anticon{
    margin-right: 0.5rem;
  }
`;

interface TimerBlockProps {
    time: number;
    afterMessage?: any;
}

const TimerBlock: React.FC<TimerBlockProps> = ({time, afterMessage}) => {

    // Сообщение при завершении времени
    const timeIsRunningOut = () => {
        return Modal.warning({
            title: 'This is a warning message',
            content: 'some messages...some messages...',
            onOk : afterMessage
        });
    };

    return <TimerWrapper>
        <ClockCircleOutlined/>
        <Timer
            formatValue={(value: any) => value < 10 ? `0${value}` : value}
            initialTime={60000 * time}
            direction="backward"
            checkpoints={[
                {
                    time: 1000,
                    callback: timeIsRunningOut,
                }
            ]}
        >
            <Timer.Minutes/> : <Timer.Seconds/>
        </Timer>
    </TimerWrapper>;
};

export default React.memo(TimerBlock);