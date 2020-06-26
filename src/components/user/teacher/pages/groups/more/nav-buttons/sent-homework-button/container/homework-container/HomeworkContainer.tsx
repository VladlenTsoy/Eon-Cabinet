import React, {useEffect} from 'react';
import {fetchHomeworkByCategoryId} from "../../../../../../../../../../store/reducers/teacher/homework/fetchHomeworkByCategoryId";
import {useDispatch, useSelector} from "react-redux";
import {disciplineSelector} from "../../../../../../../../../../store/reducers/teacher/discipline/disciplineSlice";
import {LoadingBlock} from "../../../../../../../../../../lib";
import {homeworkSelector} from "../../../../../../../../../../store/reducers/teacher/homework/homeworkSlice";
import HomeworkEmpty from "./homework-empty/HomeworkEmpty";
import FormItems from "./form-items/FormItems";

interface HomeworkContainerProps {
    categoryId: number;
}

const HomeworkContainer:React.FC<HomeworkContainerProps> = ({categoryId}) => {
    const {activeDisciplineId} = useSelector(disciplineSelector);
    const dispatch = useDispatch();
    const {fetchLoading, categories} = useSelector(homeworkSelector);

    useEffect(() => {
        const promise = dispatch(fetchHomeworkByCategoryId({categoryId, activeDisciplineId}));
        return () => {
            promise.abort();
        }
    }, [categoryId, activeDisciplineId, dispatch]);

    if(fetchLoading)
        return <LoadingBlock title="Загрука домашних заданий..."/>

    if (!fetchLoading && !(categories && categories[categoryId].length))
        return <HomeworkEmpty/>;

    return <FormItems homework={categories[categoryId]}/>;
};

export default HomeworkContainer;