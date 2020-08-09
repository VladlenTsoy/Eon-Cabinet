import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {disciplineSelector} from "../../../../../store/access/teacher/discipline/disciplineSlice";
import {fetchDisciplines} from "../../../../../store/access/teacher/discipline/fetchDisciplines";
import {Loader} from "../../../../../lib/components";

const DisciplinesProvider: React.FC = ({children}) => {
    const discipline = useSelector(disciplineSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(fetchDisciplines());
        })();
    }, [dispatch]);

    if (discipline.fetchLoading)
        return <Loader text="Загрузка дисциплин..."/>;

    return <>
        {children}
    </>
};

export default DisciplinesProvider;