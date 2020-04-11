import React from 'react';
import {Tabs} from "antd";
import {Link} from "react-router-dom";
import {Navigation, NavigationButton, TabTitleCustom} from "../../../../layouts/components";
import TabsCategories from "./tabs-categories/TabsCategories";
import {useDispatch, useSelector} from "react-redux";
import {appChangeActiveDisciplineId} from "../../../../store/app/actions";

const {TabPane} = Tabs;

const Homework:React.FC = () => {
    const {app} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const clickEventHandler = (disciplineId: string) => {
        dispatch(appChangeActiveDisciplineId(disciplineId))
    };

    return <>
        <Navigation>
            <Link to="/homework/create">
                <NavigationButton type="primary" icon="plus">
                    Создать домашнее задание
                </NavigationButton>
            </Link>
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

