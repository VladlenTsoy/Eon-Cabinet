import React from 'react';
import {Tabs} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {TabTitleCustom} from "../../../../../../layouts/components";
import {LoadingBlock} from "lib";
import TabDiscipline from "./tab-discipline/TabDiscipline";
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import {appChangeActiveDisciplineId} from "store/reducers/common/app/actions";

const {TabPane} = Tabs;

const Training: React.FC = () => {
    const {app} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [loading, tasks] = useApiUserGeneral({url: '/teacher/tasks'});

    const findTitle = (disciplineId: number) => {
        const discipline = app.disciplines.find((discipline: any) => Number(discipline.id) === Number(disciplineId));
        return discipline ? discipline.title : 'Пусто';
    };

    const clickEventHandler = (disciplineId: string) => {
        dispatch(appChangeActiveDisciplineId(disciplineId))
    };

    return loading ?
        <LoadingBlock/> :
        <Tabs
            defaultActiveKey={app.activeDisciplineId}
            size="large"
            onTabClick={clickEventHandler}
        >
            {Object.entries(tasks).map(([disciplineId, values]: any) =>
                <TabPane
                    key={disciplineId}
                    tab={
                        <TabTitleCustom>
                            {findTitle(disciplineId)}
                        </TabTitleCustom>
                    }
                >
                    <TabDiscipline tasks={values}/>
                </TabPane>
            )}
        </Tabs>;
};

export default Training;