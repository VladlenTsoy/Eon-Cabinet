import React from 'react';
import {Empty} from "antd";
import ExerciseLists from "../../../../../../homework/editor/tabs-tasks/added-exercises/exercise-lists/ExerciseLists";

interface DrawerTasksProps {
    tasks: any[];
}

const DrawerTasks: React.FC<DrawerTasksProps> = ({tasks}) => {
    return tasks.length ?
        <>
            {tasks.map((task: any, key: number) =>
                <ExerciseLists exercise={task} key={key}/>
            )}
        </> :
        <Empty description="Пусто. Нет заданий."/>;
};

export default DrawerTasks;