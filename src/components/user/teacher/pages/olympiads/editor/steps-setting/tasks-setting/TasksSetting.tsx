import React, {useState} from 'react';
import TabsTasks from "../../../../homework/editor/tabs-tasks/TabsTasks";

interface TasksSettingProps {
    current: number;
    olympiad: any;
    globalExercises: any[];
    updateGlobalExercises: (exercises: any) => void;
}

const TasksSetting: React.FC<TasksSettingProps> = (
    {
        children,
        current,
        olympiad,
        globalExercises,
        updateGlobalExercises,
    }
) => {
    const [exercises, setExercises] = useState<any[]>(globalExercises);

    const updateExercises = (exercises: any) => {
        setExercises(exercises);
        updateGlobalExercises((prevState:any) => {
            prevState[current] = exercises;
            return prevState;
        });
    };

    return <TabsTasks
        homework={olympiad}
        exercises={exercises}
        setExercises={updateExercises}
    >
        {children}
    </TabsTasks>;
};

export default TasksSetting;