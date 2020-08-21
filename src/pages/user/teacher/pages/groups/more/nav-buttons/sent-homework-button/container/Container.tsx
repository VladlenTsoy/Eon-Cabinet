import React, {useEffect} from 'react';
import {
    changeIsSaved,
} from "../../../../../../../../../store/access/teacher/group/groupSlice";
import {useDispatch} from "react-redux";
import {LoadingBlock} from "../../../../../../../../../lib/ui";
import HomeworkContainer from "./homework-container/HomeworkContainer";
import {Result} from "antd";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../../Group";
import {
    useLoadingGroups,
    useSelectGroupById
} from "../../../../../../../../../store/access/teacher/group/groupSelectors";

interface ContainerProps {
    close: () => void;
}

const Container: React.FC<ContainerProps> = ({close}) => {
    const {id} = useParams<ParamsProps>();
    const loading = useLoadingGroups()
    const group = useSelectGroupById(Number(id));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeIsSaved(false));
    }, [dispatch]);

    if (loading)
        return <LoadingBlock title="Загрузка данных группы..."/>

    if (!group)
        return <Result
            status="error"
            title="Произошла ошибка!"
            subTitle="Не выбрана группа, попробуйте обновить страницу."
        />

    return <HomeworkContainer categoryId={group.category.id} close={close}/>
};

export default Container;