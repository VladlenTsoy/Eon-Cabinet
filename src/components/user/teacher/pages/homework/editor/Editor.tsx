import React, {useEffect, useState} from 'react';
import {Tabs} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LoadingBlock} from "lib";
import {TabTitleCustom} from "../../../../../../layouts/components";
import TabsTasks from "./tabs-tasks/TabsTasks";
import ButtonSaveHomework from "./save/ButtonSaveHomework";
import {useChangeTitle} from "../../../../../../effects/use-change-title.effect";
import {useChangeActionNavbar} from "../../../../../../effects/use-change-action-navbar.effect";
import {useApiUserGeneral} from "../../../../../../effects/use-api-user-general.effect";
import {appChangeActiveDisciplineId} from "../../../../../../store/reducers/common/app/actions";

const {TabPane} = Tabs;

interface EditorHomeworkProps {
    match: any;
}

const EditorHomework: React.FC<EditorHomeworkProps> = ({match}) => {
    const {app} = useSelector((state: any) => state);
    //
    const {dataForSending} = app;
    const groupMethodId = dataForSending.isSaved && dataForSending.group?.method_id;
    //
    const [disabledDiscipline, setDisabledDiscipline] = useState(groupMethodId || 0);
    const [exercises, setExercises]: any = useState([]);
    const dispatch = useDispatch();
    const [loading, homework] = useApiUserGeneral({
        url: `/teacher/homework/${match.params.id}`,
        cancel: !match.params.id
    });

    useChangeActionNavbar({action: 'back'});
    useChangeTitle({title: match.params.id ? 'Редактировать домашнее задание' : 'Создать домашнее задание'});

    const clickEventHandler = (disciplineId: string) => {
        dispatch(appChangeActiveDisciplineId(disciplineId))
    };

    useEffect(() => {
        setDisabledDiscipline(
            exercises.length ?
                Number((
                    homework ? homework.method_id : app.activeDisciplineId
                ) || 1) : groupMethodId || 0
        );
    }, [exercises, app.activeDisciplineId, homework, groupMethodId]);

    return !loading ?
        <Tabs
            defaultActiveKey={String(homework ? homework.method_id : app.activeDisciplineId)}
            onTabClick={clickEventHandler}
        >
            {app.disciplines.map((discipline: any) =>
                <TabPane
                    tab={
                        <TabTitleCustom>
                            {discipline.title}
                        </TabTitleCustom>
                    }
                    disabled={disabledDiscipline !== 0 && disabledDiscipline !== Number(discipline.id)}
                    key={discipline.id}
                >
                    <TabsTasks
                        homework={homework}
                        exercises={exercises}
                        setExercises={setExercises}
                        discipline_id={discipline.id}
                    >
                        <ButtonSaveHomework
                            homework={homework}
                            exercises={exercises}
                            disciplineId={discipline.id}/>
                    </TabsTasks>
                </TabPane>
            )}
        </Tabs> :
        <LoadingBlock/>
};

export default EditorHomework;