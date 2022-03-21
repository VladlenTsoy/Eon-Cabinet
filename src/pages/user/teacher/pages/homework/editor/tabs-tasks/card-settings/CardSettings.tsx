import React, {useEffect} from 'react';
import {Tabs} from "antd";
import FormSetting from "./from-setting/FormSetting";
import {Card} from "../../../../../../../../lib/ui";
import {useSelector} from "react-redux";
import {tasksSelector} from "store/tasks/tasksSlice";
import {useScreenWindow} from "../../../../../../../../hooks/use-screen-window.effect";
import {fetchTasks} from "store/tasks/fetchTasks";
import {useDispatch} from "store/store";

const {TabPane} = Tabs;

interface CardSettingsProps {
    setExercises: any;
}

const CardSettings: React.FC<CardSettingsProps> = ({setExercises}) => {
    const {homework, fetchLoading} = useSelector(tasksSelector);
    const dispatch = useDispatch();
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

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
        const promise = dispatch(fetchTasks());
        return () => {
            promise.abort();
        }
    }, [dispatch]);

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
