import React, {useEffect} from 'react';
import {fetchHomeworkByCategoryId} from "../../../../../../../../../../store/access/teacher/homework/fetchHomeworkByCategoryId";
import {useDispatch, useSelector} from "react-redux";
import {disciplineSelector} from "../../../../../../../../../../store/access/teacher/discipline/disciplineSlice";
import {LoadingBlock} from "../../../../../../../../../../lib/ui";
import {homeworkSelector} from "../../../../../../../../../../store/access/teacher/homework/homeworkSlice";
import FormItems from "./form-items/FormItems";
import Empty from "./empty/Empty";

interface HomeworkContainerProps {
    categoryId: number;
    close: () => void;
}

const HomeworkContainer:React.FC<HomeworkContainerProps> = ({categoryId, close}) => {
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
        return <Empty/>;

    return <FormItems homework={categories[categoryId]} close={close}/>;
};

export default HomeworkContainer;