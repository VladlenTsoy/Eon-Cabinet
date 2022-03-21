import React, {useEffect, useState} from 'react';
import {Spin} from "lib/ui";
import styled from "styled-components";
import CardHomework from "./card-homework/CardHomework";
import {fetchHomeworkByCategoryId} from "store/homework/fetchHomeworkByCategoryId";
import {useDispatch} from "store/store";
import {
    useLoadingHomeworkByCategoryId,
    useSelectHomeworkByCategoryId,
    useLastPageHomeworkByCategoryId,
    useCurrentPageHomeworkByCategoryId
} from "store/homework/homeworkSelector";
import HomeworkEmpty from "../homework-empty/HomeworkEmpty";
import {Button} from "antd";
import {ArrowDownOutlined} from "@ant-design/icons";
import {Category} from "../../../../../../../../lib/types/common/Category";

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
    categoryId: Category['id'];
}

const TableHomework: React.FC<TableHomeworkProps> = ({categoryId}) => {
    const loading = useLoadingHomeworkByCategoryId(categoryId)
    const lastPage = useLastPageHomeworkByCategoryId(categoryId)
    const currentPage = useCurrentPageHomeworkByCategoryId(categoryId)
    const homework = useSelectHomeworkByCategoryId(categoryId);
    const dispatch = useDispatch();
    const [page, setPage] = useState(currentPage)

    const clickMoreHandler = () => {
        setPage(prevState => ++prevState)
    }

    useEffect(() => {
        const promise = dispatch(fetchHomeworkByCategoryId({categoryId, page}));
        return () => {
            promise.abort('homework fetch abort');
        }
    }, [categoryId, dispatch, page]);

    return <Spin spinning={loading} tip="Загрузка...">
        {
            homework.length ?
                <>
                    <ListStyled>
                        {homework.map((val, key) =>
                            <CardHomework homework={val} key={key}/>
                        )}
                    </ListStyled>
                    {
                        lastPage > currentPage &&
                        <div>
                            <Button onClick={clickMoreHandler} loading={loading} size="large" block icon={<ArrowDownOutlined/>}>Еще</Button>
                        </div>
                    }
                </>:
                <HomeworkEmpty/>
        }
    </Spin>
};

export default React.memo<TableHomeworkProps>(TableHomework);
