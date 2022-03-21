import React, {useCallback} from "react"
import Container from "./container/Container"
import Tab from "../../../../../../lib/ui/data-display/tabs/Tab"
import Tabs from "../../../../../../lib/ui/data-display/tabs/Tabs"
import {
    useActiveCategoryId,
    useSelectAllCategories
} from "store/category/categorySelectors"
import {useDispatch} from "store/store"
import {changeActiveCategoryId} from "store/category/categorySlice"
import TabTopExtra from "./tab-top-extra/TabTopExtra"

const Groups: React.FC = () => {
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
                    <Container categoryId={category.id} />
                </Tab>
            ))}
        </Tabs>
    )
}

export default Groups
