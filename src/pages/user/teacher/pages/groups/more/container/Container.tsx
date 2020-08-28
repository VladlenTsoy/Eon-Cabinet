import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ParamsProps} from "../Group";
import TableStudents from "./table-students/TableStudents";
import {changeSelectedIds} from "../../../../../../../store/access/teacher/students/studentsSlice";
import {Radio} from "antd";
import styled from "styled-components";
import {fetchStudents} from "../../../../../../../store/access/teacher/students/fetchStudents";
import {RadioChangeEvent} from "antd/lib/radio/interface";
import {useTeacherDispatch} from "../../../../../../../store/access/teacher/store";

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
    const dispatch = useTeacherDispatch();
    const [tab, setTab] = useState<'details' | 'homework'>('details');

    useEffect(() => {
        const promise = dispatch(fetchStudents({groupId: Number(id)}));
        return () => {
            promise.abort();
        }
    }, [dispatch, id]);

    const selectUserHandler = useCallback((ids: number[]) => dispatch(changeSelectedIds({groupId: Number(id), ids})), [dispatch])

    const changeTabHandler = (val: RadioChangeEvent) => setTab(val.target.value);

    return <ContainerStyled>
        <Radio.Group defaultValue={tab} buttonStyle="solid" onChange={changeTabHandler}>
            <Radio.Button value="details">Данные</Radio.Button>
            <Radio.Button value="events">События</Radio.Button>
        </Radio.Group>
        <TableStudents tab={tab} selectUsers={selectUserHandler}/>
    </ContainerStyled>;
};

export default Container;