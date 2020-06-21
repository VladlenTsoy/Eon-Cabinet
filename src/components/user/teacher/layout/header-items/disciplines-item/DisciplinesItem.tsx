import React from 'react';
import {Select} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {disciplineSelector, changeActiveDisciplineId} from "store/reducers/teacher/discipline/disciplineSlice";
import styled from "styled-components";
import {FaBrain} from "react-icons/fa"
import {TiSortNumericallyOutline} from "react-icons/ti"

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
    const {disciplines, activeDisciplineId} = useSelector(disciplineSelector)
    const dispatch = useDispatch();

    const handleChange = (disciplineId: number) => {
        dispatch(changeActiveDisciplineId(disciplineId))
    };

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