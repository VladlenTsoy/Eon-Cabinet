import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../Group";
import TableStudents from "./table-students/TableStudents";
import {changeSelectedIds} from "../../../../../../../store/reducers/teacher/students/studentsSlice";
import {Radio} from "antd";
import styled from "styled-components";
import {fetchStudentsDetails} from "../../../../../../../store/reducers/teacher/students/fetchStudentsDetails";
import {RadioChangeEvent} from "antd/lib/radio/interface";

const ContainerStyled = styled.div`
  .ant-radio-group {
    margin-bottom: 0.5rem;
    
    .ant-radio-button-wrapper {
      margin-right: 0.5rem;
      border-radius: 4px;
      border-width: 1px;
      
      ::before {
        content: none;
      }
    }
  }
`;

const Container = () => {
    const {id} = useParams<ParamsProps>();
    const dispatch = useDispatch();
    const [tab, setTab] = useState<'details' | 'homework'>('details');

    useEffect(() => {
        const promise = dispatch(fetchStudentsDetails({groupId: id}));
        return () => {
            promise.abort();
        }
    }, [dispatch, id]);

    const selectUserHandler = useCallback((ids: number[]) => dispatch(changeSelectedIds(ids)), [dispatch])

    const changeTabHandler = (val: RadioChangeEvent) => setTab(val.target.value);

    return <ContainerStyled>
        <Radio.Group defaultValue={tab} buttonStyle="solid" onChange={changeTabHandler}>
            <Radio.Button value="details">Данные</Radio.Button>
            <Radio.Button value="homework">Домашние задания</Radio.Button>
        </Radio.Group>
        <TableStudents tab={tab} selectUsers={selectUserHandler}/>
    </ContainerStyled>;
};

export default Container;