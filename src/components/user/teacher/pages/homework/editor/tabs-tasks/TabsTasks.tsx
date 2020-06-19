import React, {useEffect} from 'react';
import {Col, Row, Tabs} from "antd";
import {Card} from "lib";
import FormSetting from "./from-setting/FormSetting";
import AddedExercises from "./added-exercises/AddedExercises";
import {useApiUserGeneral} from "../../../../../../../hooks/use-api-user-general.effect";
import {useScreenWindow} from "../../../../../../../hooks/use-screen-window.effect";

const {TabPane} = Tabs;

interface TabsTasksProps {
    homework?: any;
    exercises: any;
    setExercises: any;
    discipline_id: number;
}

const TabsTasks: React.FC<TabsTasksProps> = (
    {
        children,
        exercises,
        setExercises,
        homework,
        discipline_id,
    }
) => {
    const [loading, tasks] = useApiUserGeneral({url: `/teacher/homework/tasks/${discipline_id}`});
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    useEffect(() => {
        if (homework && homework.tasks)
            setExercises(homework.tasks);
    }, [homework, setExercises]);

    // Send setting for start application
    const sendSubmit = (taskId: number, values: any) => {
        let task: any = tasks.find((task: any) => task.id === taskId);
        setExercises([
            ...exercises,
            ...[{
                task_name: task.title,
                task_id: taskId,
                settings: values,
            }]])
    };

    const updateExercises = (exercises: any) => {
        setExercises(exercises);
    };

    return <Row  gutter={15}>
        <Col xl={16} xs={24}>
            <Card loading={loading}>
                {!loading ? <Tabs
                    tabPosition={isBreakpoint ? "top" : "left"}
                >
                    {tasks.map((task: any) =>
                        <TabPane
                            tab={task.title}
                            key={task.id}
                        >
                            <FormSetting
                                sendSubmit={sendSubmit}
                                taskId={task.id}/>
                        </TabPane>
                    )}
                </Tabs> : null}
            </Card>
        </Col>
        <Col xl={8} xs={24}>
            <AddedExercises
                homework={homework}
                exercises={exercises}
                updateExercises={updateExercises}
            >
                {children}
            </AddedExercises>
        </Col>
    </Row>;
};

export default TabsTasks;