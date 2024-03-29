import React from "react";
import Timer from "react-compound-timer";
import styled from "styled-components";
import {ClockCircleOutlined} from '@ant-design/icons';
import {Modal} from "antd";

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
        let secondsToGo = 5;

        let modal = Modal.warning({
            title: 'Время закончилось!',
            content: 'Для продолжения нажмите ОК.',
            onOk: () => {
                clearTimeout(timeout);
                afterMessage();
            }
        });

        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                okText: `ОК (${secondsToGo})`,
            });
        }, 1000);

        const timeout = setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
            afterMessage();
        }, secondsToGo * 1000);
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