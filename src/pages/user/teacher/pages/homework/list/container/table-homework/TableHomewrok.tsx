import React, {useEffect} from 'react';
import {LoadingBlock} from "lib/components";
import styled from "styled-components";
import CardHomework from "./card-homework/CardHomework";
import {useDispatch, useSelector} from "react-redux";
import {homeworkSelector} from "../../../../../../../../store/access/teacher/homework/homeworkSlice";
import {fetchHomeworkByCategoryId} from "../../../../../../../../store/access/teacher/homework/fetchHomeworkByCategoryId";
import {disciplineSelector} from "../../../../../../../../store/access/teacher/discipline/disciplineSlice";

interface TableHomeworkProps {
    categoryId: number;
}

const ListStyled = styled.div`
  display: grid;
  gap: 2rem;
  padding: 1rem 0;
  
  @media (max-width: 992px) {
    gap: 1rem;  
  }
`;

const TableHomework: React.FC<TableHomeworkProps> = ({categoryId}) => {
    const {activeDisciplineId} = useSelector(disciplineSelector);
    const {categories} = useSelector(homeworkSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(fetchHomeworkByCategoryId({categoryId, activeDisciplineId}));
        return () => {
            promise.abort('homework fetch abort');
        }
    }, [activeDisciplineId, categoryId, dispatch]);

    if (!categories[categoryId])
        return <LoadingBlock/>;

    return <ListStyled>
        {categories[categoryId].map((val: any, key: number) =>
            <CardHomework homework={val} key={key}/>
        )}
    </ListStyled>;
};

export default React.memo(TableHomework);