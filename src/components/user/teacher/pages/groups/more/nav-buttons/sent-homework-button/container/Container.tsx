import React, {useEffect} from 'react';
import {changeIsSaved, groupSelector} from "../../../../../../../../../store/reducers/teacher/group/groupSlice";
import {useDispatch, useSelector} from "react-redux";
import {LoadingBlock} from "../../../../../../../../../lib";
import HomeworkContainer from "./homework-container/HomeworkContainer";

const Container = () => {
    const {fetchLoading, group} = useSelector(groupSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeIsSaved(false));
    }, [dispatch]);

    if(fetchLoading) return <LoadingBlock title="Загрузка данных группы..."/>
    if (!group) return <>Пусто</>

    return <HomeworkContainer categoryId={group.category.id}/>;
};

export default Container;