import React, {useEffect, useState} from 'react';
import {
    useCurrentPageGroupsByCategoryId,
    useLastPageGroupsByCategoryId,
    useLoadingGroupsByCategoryId,
    useSelectGroupsByCategoryId
} from "../../../../../../../store/access/teacher/group/groupSelectors";
import {useTeacherDispatch} from "../../../../../../../store/access/teacher/store";
import {fetchGroups} from "../../../../../../../store/access/teacher/group/fetchGroups";
import {Spin} from "../../../../../../../lib/ui";
import {Button, Col, Row} from "antd";
import GroupBlock from "./card-group/CardGroup";
import GroupsEmpty from "./groups-empty/GroupsEmpty";
import {Category} from "../../../../../../../lib/types/common/Category";
import {ArrowDownOutlined} from "@ant-design/icons";

interface ContainerProps {
    categoryId: Category['id']
}

const Container: React.FC<ContainerProps> = ({categoryId}) => {
    const loading = useLoadingGroupsByCategoryId(categoryId)
    const lastPage = useLastPageGroupsByCategoryId(categoryId)
    const currentPage = useCurrentPageGroupsByCategoryId(categoryId)
    const groups = useSelectGroupsByCategoryId(categoryId)
    const dispatch = useTeacherDispatch();
    const [page, setPage] = useState(currentPage)

    const clickMoreHandler = () => {
        setPage(prevState => ++prevState)
    }

    useEffect(() => {
        const promise = dispatch(fetchGroups({page, categoryId}))
        return () => {
            promise.abort()
        }
    }, [page, dispatch])

    return <Spin spinning={loading} tip="Загрузка...">
        {
            groups.length ?
                <>
                    <Row gutter={15}>
                        {groups.map((group) =>
                            <Col xxl={6} xl={8} lg={12} xs={24} key={group.id}>
                                <GroupBlock group={group}/>
                            </Col>
                        )}
                    </Row>
                    {
                        lastPage > currentPage &&
                        <div>
                            <Button onClick={clickMoreHandler} loading={loading} size="large" block icon={<ArrowDownOutlined/>}>Еще</Button>
                        </div>
                    }
                </> :
                <GroupsEmpty/>
        }
    </Spin>
};

export default React.memo(Container);