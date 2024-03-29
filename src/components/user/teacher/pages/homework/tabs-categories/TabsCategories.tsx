import React from 'react';
import {Tabs} from "antd";
import TableHomework from "./table-homework/TableHomewrok";
import {useScreenWindow} from "../../../../../../effects/use-screen-window.effect";

const {TabPane} = Tabs;

interface TabsCategoriesProps {
    discipline: any;
}

const TabsCategories: React.FC<TabsCategoriesProps> = ({discipline}) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    return <Tabs tabPosition={isBreakpoint ? 'top' : 'left'} style={{minHeight: '200px'}}>
        {discipline.categories.filter((category: any) => category.discipline_id === discipline.id)
            .map((category: any) =>
                <TabPane tab={category.title} key={`category-${category.id}`}>
                    <TableHomework discipline_id={discipline.id} category_id={category.id}/>
                </TabPane>
            )}
    </Tabs>
};

export default TabsCategories;