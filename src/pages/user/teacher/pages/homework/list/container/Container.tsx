import React, {useCallback} from "react"
import TableHomework from "./table-homework/TableHomewrok"
import {changeActiveCategoryId} from "store/category/categorySlice"
import Tabs from "../../../../../../../lib/ui/data-display/tabs/Tabs"
import Tab from "../../../../../../../lib/ui/data-display/tabs/Tab"
import {
    useActiveCategoryId,
    useSelectAllCategories
} from "store/category/categorySelectors"
import {useDispatch} from "store/store"
import TabTopExtra from "../tab-top-extra/TabTopExtra"

interface TabsCategoriesProps {}

const Container: React.FC<TabsCategoriesProps> = () => {
    const dispatch = useDispatch()
    const activeCategoryId = useActiveCategoryId()
    const categories = useSelectAllCategories()

    const changeActiveCategory = useCallback(
        (key: string) => {
            const id = key.replace("category-", "")
            dispatch(changeActiveCategoryId(Number(id)))
        },
        [dispatch]
    )

    return (
        <Tabs
            topExtra={<TabTopExtra />}
            defaultValue={
                activeCategoryId
                    ? `category-${activeCategoryId}`
                    : categories[0]
                    ? `category-${categories[0].id}`
                    : null
            }
            onChange={changeActiveCategory}
        >
            {categories.map(category => (
                <Tab title={category.title} key={`category-${category.id}`}>
                    <TableHomework categoryId={category.id} />
                </Tab>
            ))}
        </Tabs>
    )
}

export default Container
