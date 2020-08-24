import {useSelector} from "react-redux"
import {TeacherState} from "../store"
import {getGroupById, selectAllGroups, selectTotalGroups} from "./groupSlice"
import {Group} from "../../../../lib/types/teacher/Group"
import {groupBy} from "lodash"

// Загрузка групп
export const useLoadingGroups = () => useSelector((state: TeacherState) => state.group.loading)

// Вывод группы по ID
export const useSelectGroupById = (id: Group['id']) => useSelector((state: TeacherState) => getGroupById(state, id))

// Вывод всех групп
export const useSelectAllGroups = () => useSelector(selectAllGroups)

// Вывод всех групп по категории
export const useSelectGroupsByCategoryId = (categoryId: number) => {
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