import React from 'react';
// import {Tabs, TabPane} from "lib/ui";
import TableHomework from "./table-homework/TableHomewrok";
// import {useScreenWindow} from "../../../../../../../hooks/use-screen-window.effect";
import {useSelector} from "react-redux";
import {categorySelector} from "../../../../../../../store/access/teacher/category/categorySlice";
// import HomeworkEmpty from "./homework-empty/HomeworkEmpty";
import Tabs from "../../../../../../../lib/components/tabs/Tabs";
import Tab from "../../../../../../../lib/components/tabs/Tab";

interface TabsCategoriesProps {
}

const Container: React.FC<TabsCategoriesProps> = () => {
    const {categories} = useSelector(categorySelector);
    // const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    return <Tabs>
        {categories.map((category) =>
            <Tab title={category.title} key={`category-${category.id}`}>
                <TableHomework categoryId={category.id}/>
            </Tab>
        )}
    </Tabs>

    // if (!categories.length)
    //     return <HomeworkEmpty/>
    //
    // return <Tabs tabPosition={isBreakpoint ? 'top' : 'left'} style={{minHeight: '200px'}} type="card">
    //     {categories
    //         .map((category: any) =>
    //             <TabPane tab={category.title} key={`category-${category.id}`}>
    //                 <TableHomework categoryId={category.id}/>
    //             </TabPane>
    //         )}
    // </Tabs>
};

export default Container;