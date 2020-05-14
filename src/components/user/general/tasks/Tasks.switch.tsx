import React from 'react';
import {useRouteMatch} from 'react-router-dom';

const Mental = React.lazy(() => import("./mental/Mental"));
const Mnemonics = React.lazy(() => import("./mnemonics/Mnemonics"));

const TasksSwitch = () => {
    const {params} = useRouteMatch();
    return <>
        {params.disciplineId === '1' && <Mental taskId={params.taskId}/>}
        {params.disciplineId === 2 && <Mnemonics taskId={params.taskId}/>}
    </>;
};

export default TasksSwitch;