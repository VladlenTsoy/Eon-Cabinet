import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LoadingBlock} from "lib/components";
import {disciplineSelector} from "../../../../../../store/access/teacher/discipline/disciplineSlice";
import {fetchTasks} from "../../../../../../store/access/teacher/tasks/fetchTasks";
import {tasksSelector} from "../../../../../../store/access/teacher/tasks/tasksSlice";
import {Col, Row} from "antd";
import TaskBlock from "./task/Task";

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

    return <Row gutter={15}>
        {tasks.all.map((task: any) =>
            <Col xl={6} lg={8} md={8} sm={12} xs={24} key={task.id}>
                <TaskBlock task={task}/>
            </Col>
        )}
    </Row>
};

export default Training;