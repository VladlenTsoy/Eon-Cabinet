import React, {useEffect} from 'react';
import {LoadingBlock} from "lib/ui";
import FormItems from "./form-items/FormItems";
import Empty from "./empty/Empty";
import {
    useLoadingSelectsHomeworkByCategoryId,
    useAllSelectsHomeworkByCategoryId
} from "store/homework/homeworkSelector";
import {useDispatch} from "store/store";
import {fetchSelectsHomework} from "store/homework/fetchSelectsHomework";

interface HomeworkContainerProps {
    groupId: number;
    categoryId: number;
    close: () => void;
}

const HomeworkContainer: React.FC<HomeworkContainerProps> = ({categoryId, groupId, close}) => {
    const dispatch = useDispatch();
    const loading = useLoadingSelectsHomeworkByCategoryId(categoryId)
    const homework = useAllSelectsHomeworkByCategoryId(categoryId);

    useEffect(() => {
        const promise = dispatch(fetchSelectsHomework({categoryId, groupId}));
        return () => {
            promise.abort();
        }
    }, [categoryId, groupId, dispatch]);

    if (loading)
        return <LoadingBlock title="Загрука домашних заданий..."/>

    if (!homework.length)
        return <Empty/>;

    return <FormItems homework={homework} close={close}/>;
};

export default HomeworkContainer;
