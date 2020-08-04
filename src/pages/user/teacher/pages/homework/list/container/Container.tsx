import React from 'react';
import {Tabs} from "antd";
import TableHomework from "./table-homework/TableHomewrok";
import {useScreenWindow} from "../../../../../../../hooks/use-screen-window.effect";
import {useSelector} from "react-redux";
import {categorySelector} from "../../../../../../../store/access/teacher/category/categorySlice";
import HomeworkEmpty from "./homework-empty/HomeworkEmpty";

const {TabPane} = Tabs;

interface TabsCategoriesProps {
}

const Container: React.FC<TabsCategoriesProps> = () => {
    const {categories} = useSelector(categorySelector);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});
    const categoriesActive = categories.filter((category) => category.active);

    if (!categoriesActive.length)
        return <HomeworkEmpty/>

    return <Tabs tabPosition={isBreakpoint ? 'top' : 'left'} style={{minHeight: '200px'}}>
        {categoriesActive
            .map((category: any) =>
                <TabPane tab={category.title} key={`category-${category.id}`}>
                    <TableHomework categoryId={category.id}/>
                </TabPane>
            )}
    </Tabs>
};

export default Container;