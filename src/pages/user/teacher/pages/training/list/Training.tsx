import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {LoadingBlock} from "lib/ui";
import {fetchTasks} from "../../../../../../store/access/teacher/tasks/fetchTasks";
import {tasksSelector} from "../../../../../../store/access/teacher/tasks/tasksSlice";
import {Col, Row} from "antd";
import TaskBlock from "./task/Task";
import {useTeacherDispatch} from "../../../../../../store/access/teacher/store";

const Training: React.FC = () => {
    const tasks = useSelector(tasksSelector);
    const dispatch = useTeacherDispatch();

    useEffect(() => {
        const promise = dispatch(fetchTasks());
        return () => {
            promise.abort();
        }
    }, [dispatch]);

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