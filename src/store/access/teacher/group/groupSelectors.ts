import {useSelector} from "react-redux"
import {TeacherState} from "../store"
import {getGroupById, selectAllGroups, selectTotalGroups} from "./groupSlice"
import {Group} from "../../../../lib/types/teacher/Group"
import {groupBy} from "lodash"
import {Category} from "../../../../lib/types/common/Category";

// Загрузка групп
export const useLoadingGroups = () => useSelector((state: TeacherState) => state.group.loading)

// Загрузка групп по категории
export const useLoadingGroupsByCategoryId = (categoryId: Category['id']): boolean => useSelector((state: TeacherState) => state.group.categories[categoryId]?.loading || false)

// Последняя страница по категории
export const useLastPageGroupsByCategoryId = (categoryId: Category['id']): number => useSelector((state: TeacherState) => state.group.categories[categoryId]?.last_page || 0)

// Текущая страница по категории
export const useCurrentPageGroupsByCategoryId = (categoryId: Category['id']): number => useSelector((state: TeacherState) => state.group.categories[categoryId]?.current_page || 1)

// Вывод группы по ID
export const useSelectGroupById = (id: Group['id']) => useSelector((state: TeacherState) => getGroupById(state, id))

// Вывод всех групп
export const useSelectAllGroups = () => useSelector(selectAllGroups)

// Вывод всех групп по категории
export const useSelectGroupsByCategoryId = (categoryId: Category['id']) => {
    const groups = useSelectAllGroups()
    return groups.filter(group => group.category.id === categoryId)
}

// Вывод всех категории
export const useSelectCategories = () => {
    const groups = useSelectAllGroups()
    return groupBy(groups, (group) => group.category.id)
}

// Вывод кол-во крупп
export const useSelectTotalGroups = () => useSelector(selectTotalGroups)