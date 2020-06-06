import React from 'react';
import {Tabs} from "antd";
import {Link} from "react-router-dom";
import {Navigation, NavigationButton, TabTitleCustom} from "lib";
import TabsCategories from "./tabs-categories/TabsCategories";
import {useDispatch, useSelector} from "react-redux";
import {changeActiveDisciplineId} from "store/reducers/common/app/appSlice";
import {PlusOutlined, AppstoreOutlined} from "@ant-design/icons";
import {find} from "lodash";

const {TabPane} = Tabs;

const Homework: React.FC = () => {
    const {app} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const isMental = app.disciplines && !!find(app.disciplines, {id: 1});

    const clickEventHandler = (disciplineId: string) => {
        dispatch(changeActiveDisciplineId(disciplineId))
    };

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
        <Tabs
            defaultActiveKey={app.activeDisciplineId}
            size="large"
            onTabClick={clickEventHandler}
        >
            {app.disciplines.map((discipline: any) =>
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
        </Tabs>
    </>;
};

export default Homework;

