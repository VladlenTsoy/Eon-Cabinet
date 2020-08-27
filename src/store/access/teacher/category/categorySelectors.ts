import {useSelector} from "react-redux";
import {TeacherState} from "../store";
import {selectAllCategories} from "./categorySlice";

// Загрузка групп
export const useLoadingCategories = () => useSelector((state: TeacherState) => state.category.loading)

// Вывод всех групп
export const useSelectAllCategories = () => useSelector(selectAllCategories)

// Активная категория
export const useActiveCategoryId = () => useSelector((state:TeacherState) => state.category.activeCategoryId)