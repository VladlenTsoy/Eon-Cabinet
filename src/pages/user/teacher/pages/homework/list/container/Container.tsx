import React, {useCallback} from 'react';
import TableHomework from "./table-homework/TableHomewrok";
import {changeActiveCategoryId} from "../../../../../../../store/access/teacher/category/categorySlice";
import Tabs from "../../../../../../../lib/components/tabs/Tabs";
import Tab from "../../../../../../../lib/components/tabs/Tab";
import {
    useActiveCategoryId,
    useSelectAllCategories
} from "../../../../../../../store/access/teacher/category/categorySelectors";
import {useTeacherDispatch} from "../../../../../../../store/access/teacher/store";
import TabTopExtra from "../tab-top-extra/TabTopExtra"

interface TabsCategoriesProps {
}

const Container: React.FC<TabsCategoriesProps> = () => {
    const dispatch = useTeacherDispatch()
    const activeCategoryId = useActiveCategoryId()
    const categories = useSelectAllCategories();

    const changeActiveCategory = useCallback((key: string) => {
        const id = key.replace('category-', '')
        dispatch(changeActiveCategoryId(Number(id)))
    }, [dispatch])

    return <Tabs topExtra={<TabTopExtra/>} defaultValue={activeCategoryId ? `category-${activeCategoryId}` : null} onChange={changeActiveCategory}>
        {categories.map((category) =>
            <Tab title={category.title} key={`category-${category.id}`}>
                <TableHomework categoryId={category.id}/>
            </Tab>
        )}
    </Tabs>
};

export default Container;