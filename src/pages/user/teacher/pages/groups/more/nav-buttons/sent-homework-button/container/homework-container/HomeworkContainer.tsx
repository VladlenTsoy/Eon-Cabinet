import React, {useEffect} from 'react';
import {fetchHomeworkByCategoryId} from "../../../../../../../../../../store/access/teacher/homework/fetchHomeworkByCategoryId";
import {LoadingBlock} from "../../../../../../../../../../lib/ui";
import FormItems from "./form-items/FormItems";
import Empty from "./empty/Empty";
import {
    useLoadingHomeworkByCategoryId,
    useSelectHomeworkByCategoryId
} from "../../../../../../../../../../store/access/teacher/homework/homeworkSelector";
import {useTeacherDispatch} from "../../../../../../../../../../store/access/teacher/store";

interface HomeworkContainerProps {
    categoryId: number;
    close: () => void;
}

const HomeworkContainer:React.FC<HomeworkContainerProps> = ({categoryId, close}) => {
    const dispatch = useTeacherDispatch();
    const loading = useLoadingHomeworkByCategoryId(categoryId)
    const homework = useSelectHomeworkByCategoryId(categoryId);

    useEffect(() => {
        const promise = dispatch(fetchHomeworkByCategoryId({categoryId}));
        return () => {
            promise.abort();
        }
    }, [categoryId, dispatch]);

    if(loading)
        return <LoadingBlock title="Загрука домашних заданий..."/>

    if (homework.length)
        return <Empty/>;

    return <FormItems homework={homework} close={close}/>;
};

export default HomeworkContainer;