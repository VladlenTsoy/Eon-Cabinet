import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Loader} from "../../../../../lib/components";
import {disciplineSelector} from "../../../../../store/access/admin/discipline/disciplineSlice";
import {fetchDisciplines} from "../../../../../store/access/admin/discipline/fetchDisciplines";
import {useAdminDispatch} from "../../../../../store/access/admin/store";

const DisciplinesProvider: React.FC = ({children}) => {
    const discipline = useSelector(disciplineSelector);
    const dispatch = useAdminDispatch();

    useEffect(() => {
        const promise = dispatch(fetchDisciplines())
        return () => {
            promise.abort()
        }
    }, [dispatch]);

    if (discipline.loading)
        return <Loader text="Загрузка дисциплин..."/>;

    return <>
        {children}
    </>
};

export default DisciplinesProvider;