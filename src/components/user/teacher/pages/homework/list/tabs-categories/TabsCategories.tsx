import React from 'react';
import {Empty, Tabs} from "antd";
import TableHomework from "./table-homework/TableHomewrok";
import {useScreenWindow} from "../../../../../../../hooks/use-screen-window.effect";
import {useSelector} from "react-redux";
import {categorySelector} from "../../../../../../../store/reducers/teacher/category/categorySlice";
import {ButtonLink, DescriptionTitle} from "../../../../../../../lib";
import {PlusOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;

interface TabsCategoriesProps {
}

const TabsCategories: React.FC<TabsCategoriesProps> = () => {
    const {categories} = useSelector(categorySelector);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    if (!categories.length)
        return <Empty
            description={
                <>
                    <DescriptionTitle>Пусто</DescriptionTitle>
                    <span>Нет сохраненных домашних заданий</span>
                </>
            }
        >
            <ButtonLink type="ghost" size="large" to="/homework/create" icon={<PlusOutlined/>}>
                Создать домашнее задание
            </ButtonLink>
        </Empty>

    return <Tabs tabPosition={isBreakpoint ? 'top' : 'left'} style={{minHeight: '200px'}}>
        {categories.filter((category) => category.active)
            .map((category: any) =>
                <TabPane tab={category.title} key={`category-${category.id}`}>
                    <TableHomework categoryId={category.id}/>
                </TabPane>
            )}
    </Tabs>
};

export default TabsCategories;