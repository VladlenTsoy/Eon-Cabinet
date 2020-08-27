// Загрузка групп по категории
import {Category} from "../../../../lib/types/common/Category";
import {useSelector} from "react-redux";
import {TeacherState} from "../store";
import {selectAllHomework} from "./homeworkSlice";

// Загрузка домашних заданий по категории
export const useLoadingHomeworkByCategoryId = (categoryId: Category['id']): boolean => useSelector((state: TeacherState) => state.homework.categories[categoryId]?.loading || false)

// Последняя страница по категории
export const useLastPageHomeworkByCategoryId = (categoryId: Category['id']): number => useSelector((state: TeacherState) => state.homework.categories[categoryId]?.last_page || 0)

// Текущая страница по категории
export const useCurrentPageHomeworkByCategoryId = (categoryId: Category['id']): number => useSelector((state: TeacherState) => state.homework.categories[categoryId]?.current_page || 1)

// Вывод всех групп
export const useSelectAllHomework = () => useSelector(selectAllHomework)

// Вывод всех групп по категории
export const useSelectHomeworkByCategoryId = (categoryId: Category['id']) => {
    const homework = useSelectAllHomework()
    return homework.filter(homework => homework.category_id === categoryId)
}