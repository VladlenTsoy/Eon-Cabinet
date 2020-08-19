import React from 'react';
import {Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {disciplineSelector, changeActiveDisciplineId} from "store/access/teacher/discipline/disciplineSlice";
import {resetGroupSlice} from "store/access/teacher/group/groupSlice";
import {resetStudentSlice} from "store/access/teacher/students/studentsSlice";
import {resetTasksSlice} from "store/access/teacher/tasks/tasksSlice";
import styled from "styled-components";
import {FaBrain} from "react-icons/fa"
import {TiSortNumericallyOutline} from "react-icons/ti"
import {appSubSelector} from "../../../../../../store/common/app/appSlice";

const {Option} = Select;

const DisciplinesStyled = styled.div`
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector{
    border: 1px dashed rgba(0,0,0,0);
  }
  
  .ant-select-selection-item{
    .ricon{
      margin: 0 0.6rem;
      transform: scale(1.5);
      color: ${props => props.theme.color_primary};
      vertical-align: text-top;
    }
  }
`;

const DisciplinesItem = () => {
    const action = useSelector(appSubSelector('action'));
    const {disciplines, activeDisciplineId} = useSelector(disciplineSelector)
    const dispatch = useDispatch();

    const handleChange = (disciplineId: number) => {
        dispatch(resetGroupSlice())
        dispatch(resetStudentSlice())
        dispatch(resetTasksSlice())
        dispatch(changeActiveDisciplineId(disciplineId))
    };

    if(action)
        return <></>;

    return <DisciplinesStyled>
        <Select defaultValue={activeDisciplineId} onChange={handleChange}>
            {disciplines.map((discipline: any) =>
                <Option value={discipline.id} key={discipline.id}>
                    {discipline.id === 1 && <TiSortNumericallyOutline className="ricon"/>}
                    {discipline.id === 2 && <FaBrain className="ricon"/>}
                    {discipline.title}
                </Option>
            )}
        </Select>
    </DisciplinesStyled>
};

export default React.memo(DisciplinesItem);