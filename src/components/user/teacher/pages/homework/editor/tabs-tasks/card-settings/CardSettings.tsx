import React, {useEffect} from 'react';
import {Tabs} from "antd";
import FormSetting from "./from-setting/FormSetting";
import {Card} from "../../../../../../../../lib";
import {useDispatch, useSelector} from "react-redux";
import {tasksSelector} from "../../../../../../../../store/reducers/teacher/tasks/tasksSlice";
import {useScreenWindow} from "../../../../../../../../hooks/use-screen-window.effect";
import {fetchTasks} from "../../../../../../../../store/reducers/teacher/tasks/fetchTasks";
import {disciplineSelector} from "../../../../../../../../store/reducers/teacher/discipline/disciplineSlice";

const {TabPane} = Tabs;

interface CardSettingsProps {
    setExercises: any;
}

const CardSettings: React.FC<CardSettingsProps> = ({setExercises}) => {
    const {homework, fetchLoading} = useSelector(tasksSelector);
    const dispatch = useDispatch();
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});
    const {activeDisciplineId} = useSelector(disciplineSelector);

    // Send setting for start application
    const sendSubmit = (taskId: number, values: any) => {
        let task: any = homework.find((task: any) => task.id === taskId);
        setExercises((prevState: any) => [
            ...prevState,
            ...[{
                task_name: task.title,
                task_id: taskId,
                settings: values,
            }]
        ])
    };

    useEffect(() => {
        const promise = dispatch(fetchTasks({activeDisciplineId}));
        return () => {
            promise.abort();
        }
    }, [dispatch, activeDisciplineId]);

    return <Card loading={fetchLoading}>
        {
            !fetchLoading &&
            <Tabs tabPosition={isBreakpoint ? "top" : "left"}>
                {homework.map((task: any) =>
                    <TabPane
                        tab={task.title}
                        key={task.id}
                    >
                        <FormSetting
                            sendSubmit={sendSubmit}
                            taskId={task.id}/>
                    </TabPane>
                )}
            </Tabs>
        }
    </Card>;
};

export default React.memo(CardSettings);