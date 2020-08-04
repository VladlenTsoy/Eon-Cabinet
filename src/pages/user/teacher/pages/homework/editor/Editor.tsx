import React, {useEffect, useState} from 'react';
import {LoadingBlock} from "lib/components";
import TabsTasks from "./tabs-tasks/TabsTasks";
import ButtonSaveHomework from "./save/ButtonSaveHomework";
import {useChangeTitle} from "../../../../../../hooks/use-change-title.effect";
import {useChangeActionNavbar} from "../../../../../../hooks/use-change-action-navbar.effect";
import {useApiUserGeneral} from "../../../../../../hooks/use-api-user-general.effect";

interface EditorHomeworkProps {
    match: any;
}

const EditorHomework: React.FC<EditorHomeworkProps> = ({match}) => {
    const [exercises, setExercises]: any = useState([]);
    const [loading, homework] = useApiUserGeneral({
        url: `/teacher/homework/${match.params.id}`,
        cancel: !match.params.id
    });

    useChangeActionNavbar({action: 'back'});
    useChangeTitle({
        title: match.params.id ?
            match.params.duplication ?
                'Дублировать домашнее задание' :
                'Редактировать домашнее задание' :
            'Создать домашнее задание'
    });

    useEffect(() => {
        if (!loading && homework?.tasks)
            setExercises(homework.tasks);
    }, [homework, loading]);

    return !loading ?
        <TabsTasks
            homework={homework}
            exercises={exercises}
            setExercises={setExercises}
        >
            <ButtonSaveHomework
                homework={homework}
                exercises={exercises}
            />
        </TabsTasks> :
        <LoadingBlock/>
};

export default EditorHomework;