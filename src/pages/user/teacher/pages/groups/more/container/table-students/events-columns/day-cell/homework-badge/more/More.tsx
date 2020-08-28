import React from 'react';
import {Homework} from "../../../../../../../../../../../../store/access/teacher/students/homework/homework";
import ColumnTask from "./column-task/ColumnTask";
import styled from "styled-components";

const MoreStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`

interface MoreProps {
    homework: Homework
}

const More: React.FC<MoreProps> = ({homework}) => {
    return <MoreStyled>
        {
            homework.tasks.map((task, key) =>
                <ColumnTask task={task} key={key}/>)
        }
    </MoreStyled>
};

export default More;