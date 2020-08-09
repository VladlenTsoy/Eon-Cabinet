import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {algorithmSelector} from "../../../../../store/access/teacher/algorithm/algorithmSlice";
import {fetchAlgorithms} from "../../../../../store/access/teacher/algorithm/fetchAlgorithms";
import {disciplineSelector} from "../../../../../store/access/teacher/discipline/disciplineSlice";
import {Loader} from "../../../../../lib/components";

const AlgorithmsProvider: React.FC = ({children}) => {
    const discipline = useSelector(disciplineSelector);
    const algorithm = useSelector(algorithmSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (discipline.activeDisciplineId === 1)
            dispatch(fetchAlgorithms());
    }, [dispatch, discipline.activeDisciplineId]);

    if (algorithm.fetchLoading)
        return <Loader text="Загрузка алгоритмов..."/>;

    return <>{children}</>
};

export default AlgorithmsProvider;