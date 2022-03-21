import {useSelector} from "react-redux"
import {StoreState} from "store"
import {getGroupById, selectAllGroups} from "./groupSlice"
import {Group} from "../../lib/types/teacher/Group"
import {Category} from "../../lib/types/common/Category";

// Загрузка групп
export const useLoadingGroups = () => useSelector((state: StoreState) => state.group.loading)

// Загрузка групп по категории
export const useLoadingGroupsByCategoryId = (categoryId: Category['id']): boolean => useSelector((state: StoreState) => state.group.categories[categoryId]?.loading || false)

// Последняя страница по категории
export const useLastPageGroupsByCategoryId = (categoryId: Category['id']): number => useSelector((state: StoreState) => state.group.categories[categoryId]?.last_page || 0)

// Текущая страница по категории
export const useCurrentPageGroupsByCategoryId = (categoryId: Category['id']): number => useSelector((state: StoreState) => state.group.categories[categoryId]?.current_page || 1)

// Вывод группы по ID
export const useSelectGroupById = (id: Group['id']) => useSelector((state: StoreState) => getGroupById(state, id))

// Вывод всех групп
export const useSelectAllGroups = () => useSelector(selectAllGroups)

// Вывод всех групп по категории
export const useSelectGroupsByCategoryId = (categoryId: Category['id']) => {
    const groups = useSelectAllGroups()
    return groups.filter(group => group.category.id === categoryId)
}

// Загрузка групп по категории для select
export const useLoadingSelectsGroupsByCategoryId = (categoryId: Category['id']): boolean => useSelector((state: StoreState) => state.group.selects[categoryId]?.loading || false)

// групп по категории для select
export const useAllSelectsGroupsByCategoryId = (categoryId: Category['id']) => useSelector((state: StoreState) => state.group.selects[categoryId]?.data || [])
