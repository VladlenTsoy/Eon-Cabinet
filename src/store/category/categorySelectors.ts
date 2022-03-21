import {useSelector} from "react-redux";
import {StoreState} from "store";
import {selectAllCategories} from "./categorySlice";

// Загрузка групп
export const useLoadingCategories = () => useSelector((state: StoreState) => state.category.loading)

// Вывод всех групп
export const useSelectAllCategories = () => useSelector(selectAllCategories)

// Активная категория
export const useActiveCategoryId = () => useSelector((state:StoreState) => state.category.activeCategoryId)
