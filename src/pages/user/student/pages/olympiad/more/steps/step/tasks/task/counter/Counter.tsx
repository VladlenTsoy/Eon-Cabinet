import styled from "styled-components";
import TaskSuccessSVG from "assets/images/olympiad/task_success.svg";
import React from "react";
import {GrayIcon} from "lib/ui";

const CounterWrapper: any = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .task-mode{
    position: absolute;
    top: 12px;
    width: 60px;
    z-index: 5;
    font-size: 14px;
    color: #ffffff;
    background: #ff4755;
    padding: 0 0.5rem;
    border-radius: 10px;
    box-shadow: 0 -3px 5px #ff983878;
  }
  
  .quantity{
    position: absolute;
    font-size: 25px;
    font-weight: 600;
    white-space: nowrap;
    background: #ff4755;
    color: #ffffff;
    box-shadow: 0 3px 5px #ff983878;
    bottom: 0;
    line-height: 1;
    padding: 0.25rem 1rem;
    border-radius: 50px;
    
    .slash{
      margin: 0 0.4rem;
      opacity: 0.25;
    }
    
    @media (max-width: 576px) {
      font-size: 25px;
    }
  }
  
  @media (max-width: 576px) {
    //height: 115px;
    width: 115px;
  }
`;

interface CounterProps {
    task: any;
}

const Counter: React.FC<CounterProps> = ({task}) => {
    let percent = task.result ? task.result.countSuccess / task.count_all * 100 : 0;
    let taskMode = () => {
        if (task.task_id === 15)
            return task.settings.mode;
        if (task.task_id === 16)
            return task.settings['task-mode'];
        return 'basic';
    };

    return <CounterWrapper>
        {taskMode() === 'list' ? <span className="task-mode">Листы</span> : null}
        <GrayIcon img={TaskSuccessSVG} width="120px" percent={percent} alt="Звезда"/>
        <div className="quantity">
            {task.result ? task.result.countSuccess : 0}
            <span className="slash">/</span>
            {task.count_all}
        </div>
    </CounterWrapper>;
};

export default React.memo(Counter);