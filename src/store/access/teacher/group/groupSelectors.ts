import {useSelector} from "react-redux";
import {TeacherState} from "../store";
import {getGroupById, selectAllGroups, selectTotalGroups} from "./groupSlice";
import {Group} from "../../../../lib/types/teacher/Group";

// Загрузка групп
export const useLoadingGroups = () => useSelector((state: TeacherState) => state.group.loading)

// Вывод группы по ID
export const useSelectGroupById = (id: Group['id']) => useSelector((state: TeacherState) => getGroupById(state, id))

// Вывод всех групп
export const useSelectAllGroups = () => useSelector(selectAllGroups)

// Вывод кол-во крупп
export const useSelectTotalGroups = () => useSelector(selectTotalGroups)