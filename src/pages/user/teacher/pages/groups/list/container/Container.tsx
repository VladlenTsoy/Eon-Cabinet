import React from 'react';
import {useSelector} from "react-redux";
import {categorySelector} from "../../../../../../../store/access/teacher/category/categorySlice";
// import {useScreenWindow} from "../../../../../../../hooks/use-screen-window.effect";
import GroupsGrid from "./groups-grid/GroupsGrid";
// import {useLoadingGroups} from "../../../../../../../store/access/teacher/group/groupSelectors";
// import {Spin} from "../../../../../../../lib/ui";

import Tabs from "../../../../../../../lib/components/tabs/Tabs";
import Tab from "../../../../../../../lib/components/tabs/Tab";

interface ContainerProps {
}

const Container: React.FC<ContainerProps> = () => {
    const {categories} = useSelector(categorySelector);
    // const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});
    // const loading = useLoadingGroups()

    return <Tabs>
        {categories
            .map((category) =>
                <Tab title={category.title} key={`category-${category.id}`}>
                    {/*<Spin spinning={loading} tip="Загрузка...">*/}
                    <GroupsGrid categoryId={category.id}/>
                    {/*</Spin>*/}
                </Tab>
            )}
    </Tabs>;
};

export default React.memo(Container);