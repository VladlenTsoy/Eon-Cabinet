import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {disciplineSelector} from "../../../../../store/access/teacher/discipline/disciplineSlice";
import {fetchDisciplines} from "../../../../../store/access/teacher/discipline/fetchDisciplines";
import {Loader} from "../../../../../lib/components";
import {useTeacherDispatch} from "../../../../../store/access/teacher/store";

const DisciplinesProvider: React.FC = ({children}) => {
    const discipline = useSelector(disciplineSelector);
    const dispatch = useTeacherDispatch();

    useEffect(() => {
        const promise = dispatch(fetchDisciplines())
        return () => {
            promise.abort()
        }
    }, [dispatch]);

    if (discipline.fetchLoading)
        return <Loader text="Загрузка дисциплин..."/>;

    return <>
        {children}
    </>
};

export default DisciplinesProvider;