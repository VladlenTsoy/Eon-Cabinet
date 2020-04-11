import React from 'react';
import Counter from "./counter/Counter";
import Action from "./action/Action";
import styled from "styled-components";

interface TasksStyleProps {
    type: 'default' | 'winner' | 'loser'
}

const TaskWrapper: React.FC<TasksStyleProps> = styled.div<TasksStyleProps>`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-gap: 1rem;
  align-items: center;
  background-size: 120%;
  
  @media (max-width: 576px) {
    grid-template-columns: 115px 1fr;
  }
`;

interface TaskProps {
    task: any;
}

const Task: React.FC<TaskProps> = ({task}) => {
    const type = !task.result ? 'default' : task.result.exodus ? 'winner' : 'loser';

    return <TaskWrapper type={type}>
        <Counter task={task}/>
        <Action task={task} type="default"/>
    </TaskWrapper>;
};

export default Task;