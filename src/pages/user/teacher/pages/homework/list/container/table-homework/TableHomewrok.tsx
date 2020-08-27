import React, {useEffect} from 'react';
import {Spin} from "lib/ui";
import styled from "styled-components";
import CardHomework from "./card-homework/CardHomework";
import {fetchHomeworkByCategoryId} from "../../../../../../../../store/access/teacher/homework/fetchHomeworkByCategoryId";
import {useTeacherDispatch} from "../../../../../../../../store/access/teacher/store";
import {
    useLoadingHomeworkByCategoryId,
    useSelectHomeworkByCategoryId
} from "../../../../../../../../store/access/teacher/homework/homeworkSelector";
import HomeworkEmpty from "../homework-empty/HomeworkEmpty";

const ListStyled = styled.div`
  display: grid;
  gap: 2rem;
  padding: 5px 0 1.5rem;
  
  @media (max-width: 1600px) {
    padding-top: 0;
    gap: 1rem;  
  }
`;

interface TableHomeworkProps {
    categoryId: number;
}

const TableHomework: React.FC<TableHomeworkProps> = ({categoryId}) => {
    const loading = useLoadingHomeworkByCategoryId(categoryId)
    const homework = useSelectHomeworkByCategoryId(categoryId);
    const dispatch = useTeacherDispatch();

    useEffect(() => {
        const promise = dispatch(fetchHomeworkByCategoryId({categoryId}));
        return () => {
            promise.abort('homework fetch abort');
        }
    }, [categoryId, dispatch]);

    return <Spin spinning={loading} tip="Загрузка...">
        {
            homework.length ?
                <ListStyled>
                    {homework.map((val, key) =>
                        <CardHomework homework={val} key={key}/>
                    )}
                </ListStyled> :
                <HomeworkEmpty/>
        }
    </Spin>
};

export default React.memo<TableHomeworkProps>(TableHomework);