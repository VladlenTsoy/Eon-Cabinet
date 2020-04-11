import React from 'react';
import {Col, Row, Empty, Tabs} from "antd";
import GroupBlock from "./card-group/CardGroup";
import {Navigation, NavigationButton, Spin, TabTitleCustom} from "../../../../../layouts/components";
import EditorGroupButton from "./editor-group-button/EditorGroupButton";
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect";
import {appChangeActiveDisciplineId} from "../../../../../store/app/actions";
import {useDispatch, useSelector} from "react-redux";

const {TabPane} = Tabs;

const Groups: React.FC = () => {
    const {app} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [loading, groups, , fetch] = useApiUserGeneral({url: '/teacher/groups', initValue: {}});

    const findTitle = (disciplineId: number) => {
        const discipline = app.disciplines.find((discipline: any) => Number(discipline.id) === Number(disciplineId));
        return discipline ? discipline.title : 'Пусто';
    };

    const clickEventHandler = (disciplineId: string) => {
        dispatch(appChangeActiveDisciplineId(disciplineId))
    };

    return <>
        <Navigation>
            <EditorGroupButton fetch={fetch} title="Создать группу">
                <NavigationButton type="primary" icon="plus">
                    Создать группу
                </NavigationButton>
            </EditorGroupButton>
        </Navigation>

        <Spin spinning={loading} tip="Загрузка...">
            {Object.entries(groups).length ?
                <Tabs
                    defaultActiveKey={app.activeDisciplineId}
                    size="large"
                    onTabClick={clickEventHandler}
                >
                    {Object.entries(groups).map(([disciplineId, values]: any) =>
                        <TabPane
                            key={disciplineId}
                            tab={
                                <TabTitleCustom>
                                    {findTitle(disciplineId)}
                                </TabTitleCustom>
                            }
                        >
                            <Row  gutter={15}>
                                {values.map((group: any) =>
                                    <Col xxl={6} lg={8} md={12} sm={12} xs={24} key={group.id}>
                                        <GroupBlock group={group} fetchGroups={fetch}/>
                                    </Col>
                                )}
                            </Row>
                        </TabPane>
                    )}
                </Tabs> :
                <Col span={24}>
                    <Empty/>
                </Col>
            }
        </Spin>
    </>
};

export default Groups;