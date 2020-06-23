import React from 'react';
import {Col, Row} from "antd";
import AddedExercises from "./added-exercises/AddedExercises";
import CardSettings from "./card-settings/CardSettings";

interface TabsTasksProps {
    homework?: any;
    exercises: any;
    setExercises: any;
}

const TabsTasks: React.FC<TabsTasksProps> = (
    {
        children,
        exercises,
        setExercises,
        homework,
    }
) => {

    return <Row gutter={15}>
        <Col xl={16} xs={24}>
            <CardSettings setExercises={setExercises}/>
        </Col>
        <Col xl={8} xs={24}>
            <AddedExercises
                homework={homework}
                exercises={exercises}
                updateExercises={setExercises}
            >
                {children}
            </AddedExercises>
        </Col>
    </Row>;
};

export default TabsTasks;