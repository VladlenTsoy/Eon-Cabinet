import React from 'react';
import {Navigation, NavigationButton, TabTitleCustom} from "lib";
import {Link} from "react-router-dom";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {appSelector, changeActiveDisciplineId} from "store/reducers/common/app/appSlice";
import {Tabs} from "antd";
import Discipline from "./disipline/Discipline";

const {TabPane} = Tabs;

const Olympiads = () => {
    const app = useSelector(appSelector);
    const dispatch = useDispatch();

    const clickEventHandler = (disciplineId: string) => {
        dispatch(changeActiveDisciplineId(disciplineId))
    };

    return <>
        <Navigation>
            <Link to="/olympiad/create">
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать олимпиаду
                </NavigationButton>
            </Link>
        </Navigation>
        {
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
                        <Discipline disciplineId={discipline.id}/>
                    </TabPane>
                )}
            </Tabs>
        }
    </>;
};

export default Olympiads;