import React from "react";
import {Card} from "lib";
import styled from "styled-components";
import LossSvg from 'assets/images/icons/loss.svg';
import WinSvg from 'assets/images/icons/win.svg';
import Counter from "./counter/Counter";
import Action from "./action/Action";

export const TaskBlockWrapper = styled(Card)`
  &.ant-card{
      background: ${(props: any) => props.type === 'default' ? '' : props.type === 'winner' ? `url(${WinSvg}) no-repeat -108% 18%,` : `url(${LossSvg}) no-repeat center 2%,`}
          ${(props: any) => props.type === 'default' ? 'auto' : props.type === 'winner' ? props.theme.gradient_warning : props.theme.gradient_danger};
      box-shadow: ${(props: any) => props.type === 'default' ? '0 5px 10px 0 rgba(0,0,0,0.1)' : props.type === 'winner' ? props.theme.shadow_warning : props.theme.shadow_danger};
      background-size: 120%;
  }
  .content{  
    display: grid;
    grid-template-columns: 150px 1fr;
    grid-gap: 1rem;
    align-items: center;
    
    @media (max-width: 576px) {
      grid-template-columns: 115px 1fr;
    }
  }
`;

interface TaskBlockProps {
    id: any;
    task: any;
}

const Task: React.FC<TaskBlockProps> = ({id, task}) => {
    const type = !task.first ? 'default' : task.first.exodus ? 'winner' : 'loser';

    return <TaskBlockWrapper type={type}>
        <div className="content">
            <Counter task={task} type={type}/>
            <Action task={task} id={id} type={type}/>
        </div>
    </TaskBlockWrapper>;
};

export default Task;