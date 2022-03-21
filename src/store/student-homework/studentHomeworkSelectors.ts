import {useSelector} from "react-redux"
import {StoreState} from "store"

// Загрука
export const useLoadingStudentHomework = () => useSelector((state: StoreState) => state.studentHomework.loading)
