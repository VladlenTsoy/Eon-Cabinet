import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {disciplineSelector} from "store/discipline/disciplineSlice";
import {fetchDisciplines} from "store/discipline/fetchDisciplines";
import {Loader} from "../../../../../lib/ui";
import {useDispatch} from "store/store";

const DisciplinesProvider: React.FC = ({children}) => {
    const discipline = useSelector(disciplineSelector);
    const dispatch = useDispatch();

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
