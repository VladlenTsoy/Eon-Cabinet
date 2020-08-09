import {useSelector} from "react-redux";
import {disciplineSelector} from "../store/access/teacher/discipline/disciplineSlice";

const useDiscipline = () => {
    const discipline = useSelector(disciplineSelector)

    return discipline;
}