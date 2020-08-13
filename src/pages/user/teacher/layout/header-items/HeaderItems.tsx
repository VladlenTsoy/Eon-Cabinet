import React from "react";
import Search from "./search-item/Search";
import DisciplinesItem from "./disciplines-item/DisciplinesItem";
import {useSelector} from "react-redux";
import {disciplineSelector} from "../../../../../store/access/teacher/discipline/disciplineSlice";

const HeaderItems = () => {
    const {activeDisciplineId} = useSelector(disciplineSelector);
    const isMental = Number(activeDisciplineId) === 1;

    return [
        ...isMental ? [<Search key="search"/>] : [],
        <DisciplinesItem key="disciplines"/>,
    ]
};

export default HeaderItems;