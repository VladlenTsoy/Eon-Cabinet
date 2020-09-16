import React from 'react';
import styled from "styled-components";
import WinSvg from "../../../../../../../../../assets/images/icons/win.svg";
import LossSvg from "../../../../../../../../../assets/images/icons/loss.svg";
import { FileOutlined } from '@ant-design/icons';

const CountersWrapper = styled.div`
  position: relative;
`;

const CounterWrapper: any = styled.div`
  position: relative;
  margin: ${(props: any) => props.second ? 'inherit' : '0 auto'};
  border-radius: 50%;
  color: #fff;
  height: 150px;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props: any) => props.type === 'default' ? '' : props.type === 'winner' ? `url(${WinSvg}) no-repeat 0 0,` : `url(${LossSvg}) no-repeat center -85%,`}
      ${(props: any) => props.type === 'default' ? props.theme.gradient_info : props.type === 'winner' ? props.theme.gradient_warning : props.theme.gradient_danger};
  box-shadow: ${(props: any) => props.type === 'default' ? props.theme.shadow_info : props.type === 'winner' ? props.theme.shadow_warning : props.theme.shadow_danger};
  background-size: 140%;
  
  .anticon{
    font-size: 20px;
    margin-bottom: 0.5rem;
    color: rgba(255,255,255,0.5);
  }
  
  .quantity{
    font-size: 35px;
    font-weight: 900;
    white-space: nowrap;
    
    @media (max-width: 576px) {
      font-size: 25px;
    }
  }
  
  .task-mode{
    font-size: 16px;
    margin-top: 0.5rem;
    color: rgba(255,255,255,0.65);
  }
  
  &:hover{
    z-index: 5;
  }
  
  @media (max-width: 576px) {
    height: 115px;
    width: 115px;
  }
`;

const SecondCounterWrapper: any = styled(CounterWrapper)`
  position: absolute;
  top: 0;
  right: 0;
`;

interface CounterProps {
    task: any;
    type: string;
}

const Counter: React.FC<CounterProps> = ({task, type}) => {
    let taskMode = () => {
        if (task.task_id === 15)
            return task.settings.mode;
        if (task.task_id === 24)
            return task.settings.type_task;
        if (task.task_id === 16)
            return task.settings['task-mode'];
        return 'basic';
    };

    return (
        <CountersWrapper>
            <CounterWrapper type={type} second={task.second}>
                {taskMode() === 'list' ? <FileOutlined /> : null}
                <span className="quantity">{task.first ? task.first.count_success : 0} / {task.count_all}</span>
                {taskMode() === 'list' ? <span className="task-mode">Листы</span> : null}
            </CounterWrapper>
            {task.second ?
                <SecondCounterWrapper type={task.second.exodus ? 'winner' : 'loser'}>
                    {taskMode() === 'list' ? <FileOutlined /> : null}
                    <span className="quantity">{task.second.count_success} / {task.count_all}</span>
                    {taskMode() === 'list' ? <span className="task-mode">Листы</span> : null}
                </SecondCounterWrapper> : null
            }
        </CountersWrapper>
    );
};

export default Counter;