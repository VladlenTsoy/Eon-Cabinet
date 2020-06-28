import React from 'react';
import styled from "styled-components";
import ColumnTask from "./column-task/ColumnTask";
import Title from "./title/Title";
import {Homework} from "../../../../../../../../../../store/reducers/teacher/students/studentsSlice";

const WrapperTd = styled.td`
   padding: 0;
`;

const WrapperStatisticTable = styled.table`
    .ant-table &{
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


interface ColumnHomeworkProps {
    homework: Homework;
}

const ColumnHomework: React.FC<ColumnHomeworkProps> = ({homework}) => {
    return <WrapperTd>
        <WrapperStatisticTable>
            <thead>
            <tr>
                <th colSpan={homework.tasks.length}>
                    <Title homework={homework}/>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                {
                    homework.tasks.map((task, key) =>
                        <ColumnTask task={task} key={key}/>)
                }
            </tr>
            </tbody>
        </WrapperStatisticTable>
    </WrapperTd>
};

export default ColumnHomework;