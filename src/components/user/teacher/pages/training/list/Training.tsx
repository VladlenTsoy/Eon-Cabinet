import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LoadingBlock} from "lib";
import TabDiscipline from "./tab-discipline/TabDiscipline";
import {fetchTasks} from "../../../../../../store/reducers/teacher/tasks/fetchTasks";
import {disciplineSelector} from "../../../../../../store/reducers/teacher/discipline/disciplineSlice";
import {tasksSelector} from "../../../../../../store/reducers/teacher/tasks/tasksSlice";

const Training: React.FC = () => {
    const tasks = useSelector(tasksSelector);
    const {activeDisciplineId} = useSelector(disciplineSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(fetchTasks({activeDisciplineId}));
        return () => {
            promise.abort();
        }
    }, [activeDisciplineId, dispatch]);

    if (tasks.fetchLoading)
        return <LoadingBlock/>;

    return <TabDiscipline tasks={tasks.all}/>
};

export default Training;