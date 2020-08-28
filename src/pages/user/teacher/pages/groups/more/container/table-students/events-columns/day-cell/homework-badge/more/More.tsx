import React from 'react';
import {Homework} from "../../../../../../../../../../../../store/access/teacher/students/homework/homework";
import ColumnTask from "./column-task/ColumnTask";
import styled from "styled-components";

const WrapperStatisticTable = styled.table`
    &{
       border-left: 3px solid ${props => props.theme.color_border};
       margin-right: 10px;
       border-radius: 0;

       th, td {
          border: 0;
          line-height: 14px;
          padding: .5rem
       }
    }
`;

interface MoreProps {
    homework: Homework
}

const More: React.FC<MoreProps> = ({homework}) => {
    console.log(homework)
    return <>
        <WrapperStatisticTable>
            <tbody>
            <tr>
                {
                    homework.tasks.map((task, key) =>
                        <ColumnTask task={task} key={key}/>)
                }
            </tr>
            </tbody>
        </WrapperStatisticTable>
    </>
};

export default More;