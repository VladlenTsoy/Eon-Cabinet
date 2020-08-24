import React from 'react';
import {useSelector} from "react-redux";
import {categorySelector} from "../../../../../../../store/access/teacher/category/categorySlice";
import {useScreenWindow} from "../../../../../../../hooks/use-screen-window.effect";
import GroupsGrid from "./groups-grid/GroupsGrid";
import {useLoadingGroups} from "../../../../../../../store/access/teacher/group/groupSelectors";
import {Spin, Tabs, TabPane} from "../../../../../../../lib/ui";


interface ContainerProps {
}

const Container: React.FC<ContainerProps> = () => {
    const {categories} = useSelector(categorySelector);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});
    const loading = useLoadingGroups()

    return <Tabs tabPosition={isBreakpoint ? 'top' : 'left'} type="card" style={{minHeight: '200px'}}>
        {categories
            .map((category) =>
                <TabPane tab={category.title} key={`category-${category.id}`}>
                    <Spin spinning={loading} tip="Загрузка...">
                        <GroupsGrid categoryId={category.id}/>
                    </Spin>
                </TabPane>
            )}
    </Tabs>;
};

export default React.memo(Container);