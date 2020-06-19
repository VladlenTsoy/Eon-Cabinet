import React, {useState} from 'react';
import {Drawer} from "../../../../../../../../../lib";
import DrawerTasks from "./drawer/DrawerTasks";
import { InfoCircleOutlined } from '@ant-design/icons';
import {Button} from "antd";
import {useScreenWindow} from "../../../../../../../../../hooks/use-screen-window.effect";

interface TasksBtnProps {
    tasks: any[];
}

const TasksBtn: React.FC<TasksBtnProps> = (
    {
        tasks
    }
) => {
    const [visibleTasks, setVisibleTasks] = useState(false);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const handlerClickTasks = () =>
        setVisibleTasks(true);

    const closeTasks = () =>
        setVisibleTasks(false);

    return <>
        <Button icon={<InfoCircleOutlined />} onClick={handlerClickTasks}>Подробнее</Button>
        <Drawer
            width={isBreakpoint ? '100%' : 450}
            title="Задания"
            destroyOnClose={true}
            onClose={closeTasks}
            visible={visibleTasks}
        >
            <DrawerTasks tasks={tasks}/>
        </Drawer>
    </>;
};

export default TasksBtn;