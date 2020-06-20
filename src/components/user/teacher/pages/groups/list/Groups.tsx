import React, {useCallback, useEffect} from 'react';
import {Col, Row, Empty} from "antd";
import GroupBlock from "./card-group/CardGroup";
import {Navigation, NavigationButton, Spin} from "../../../../../../lib";
import EditorButton from "./editor-button/EditorButton";
import {useDispatch, useSelector} from "react-redux";
import {PlusOutlined} from "@ant-design/icons";
import {fetchGroups} from "../../../../../../store/reducers/teacher/group/fetchGroups";
import {groupSelector} from "../../../../../../store/reducers/teacher/group/groupSlice";
import {disciplineSelector} from "../../../../../../store/reducers/teacher/discipline/disciplineSlice";

const Groups: React.FC = () => {
    const {activeDisciplineId} = useSelector(disciplineSelector);
    const {groups, fetchLoading} = useSelector(groupSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const promise = dispatch(fetchGroups({activeDisciplineId}));
        return () => {
            promise.abort();
        }
    }, [activeDisciplineId, dispatch]);

    return <>
        <Navigation>
            <EditorButton title="Создать группу">
                <NavigationButton type="primary" icon={<PlusOutlined/>}>
                    Создать группу
                </NavigationButton>
            </EditorButton>
        </Navigation>

        <Spin spinning={fetchLoading} tip="Загрузка...">
            {groups.length ?
                <Row gutter={15}>
                    {groups.map((group: any) =>
                        <Col xxl={6} lg={8} md={12} sm={12} xs={24} key={group.id}>
                            <GroupBlock group={group}/>
                        </Col>
                    )}
                </Row> :
                <Col span={24}>
                    <Empty/>
                </Col>
            }
        </Spin>
    </>
};

export default Groups;