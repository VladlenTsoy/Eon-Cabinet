import React from 'react';
import {useApiUserGeneral} from "hooks/use-api-user-general.effect";
import {LoadingBlock} from "lib";
import Task from "./task/Task";
import styled from "styled-components";

const TasksWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.5rem;
  margin: 2rem 0 0;
  
      
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
    
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

type TasksProps = {
    currentStep: any;
};

const Tasks: React.FC<TasksProps> = ({currentStep}) => {
    const [loading, tasks] = useApiUserGeneral({url: `/student/olympiad/${currentStep.access.sent_id}/tasks`});

    if (loading)
        return <LoadingBlock/>;

    return <TasksWrapper>
        {tasks.map((item: any, key: number) =>
            <Task task={item} key={key}/>
        )}
    </TasksWrapper>
};

export default Tasks;