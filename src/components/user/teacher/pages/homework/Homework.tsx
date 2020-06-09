import React from 'react';
import {Tabs, Empty} from "antd";
import {Link} from "react-router-dom";
import {DescriptionTitle, Navigation, NavigationButton, Spin, TabTitleCustom, ButtonLink} from "lib";
import TabsCategories from "./tabs-categories/TabsCategories";
import {useDispatch, useSelector} from "react-redux";
import {appSelector, changeActiveDisciplineId} from "store/reducers/common/app/appSlice";
import {PlusOutlined, AppstoreOutlined} from "@ant-design/icons";
import {find} from "lodash";
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect";

const {TabPane} = Tabs;

const Homework: React.FC = () => {
    const app = useSelector(appSelector);
    const dispatch = useDispatch();
    const isMental = app.disciplines && !!find(app.disciplines, {id: 1});

    const clickEventHandler = (disciplineId: string) => {
        dispatch(changeActiveDisciplineId(disciplineId))
    };


    const [loading, disciplines] = useApiUserGeneral({url: '/teacher/homework/tabs', initValue: []});


    return <>
        <Navigation>
            <Link to="/homework/create">
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать домашнее задание
                </NavigationButton>
            </Link>
            {
                isMental ?
                    <Link to="/settings/custom-exercises">
                        <NavigationButton type="primary" icon={<AppstoreOutlined/>}>
                            Свои примеры
                        </NavigationButton>
                    </Link> : null
            }
        </Navigation>
        <Spin spinning={loading} tip="Загрузка...">
            {disciplines.length ?
                <Tabs
                    defaultActiveKey={app.activeDisciplineId}
                    size="large"
                    onTabClick={clickEventHandler}
                >
                    {disciplines.map((discipline: any) =>
                        <TabPane
                            tab={
                                <TabTitleCustom>
                                    {discipline.title}
                                </TabTitleCustom>
                            }
                            key={discipline.id}
                        >
                            <TabsCategories discipline={discipline}/>
                        </TabPane>
                    )}
                </Tabs> :
                <Empty
                    description={
                        <>
                            <DescriptionTitle>Пусто</DescriptionTitle>
                            <span>Нет сохраненных домашних заданий</span>
                        </>
                    }
                >
                    <ButtonLink type="ghost" size="large" to="/homework/create" icon={<PlusOutlined />}>
                        Создать домашнее задание
                    </ButtonLink>
                </Empty>
            }
        </Spin>
    </>;
};

export default Homework;

