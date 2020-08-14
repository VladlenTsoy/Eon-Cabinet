import React, {useEffect} from 'react';
import {changeIsSaved, groupSelector} from "../../../../../../../../../store/access/teacher/group/groupSlice";
import {useDispatch, useSelector} from "react-redux";
import {LoadingBlock} from "../../../../../../../../../lib/components";
import HomeworkContainer from "./homework-container/HomeworkContainer";

interface ContainerProps {
    close: () => void;
}

const Container:React.FC<ContainerProps> = ({close}) => {
    const {group} = useSelector(groupSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeIsSaved(false));
    }, [dispatch]);

    if(group.loading) return <LoadingBlock title="Загрузка данных группы..."/>
    if (!group.detail) return <>Пусто</>

    return <HomeworkContainer categoryId={group.detail.category.id} close={close}/>
};

export default Container;