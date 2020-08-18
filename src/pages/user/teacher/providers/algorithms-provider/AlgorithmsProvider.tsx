import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {algorithmSelector} from "../../../../../store/access/teacher/algorithm/algorithmSlice";
import {fetchAlgorithms} from "../../../../../store/access/teacher/algorithm/fetchAlgorithms";
import {disciplineSelector} from "../../../../../store/access/teacher/discipline/disciplineSlice";
import {Loader} from "../../../../../lib/components";
import {useTeacherDispatch} from "../../../../../store/access/teacher/store";

const AlgorithmsProvider: React.FC = ({children}) => {
    const discipline = useSelector(disciplineSelector);
    const algorithm = useSelector(algorithmSelector);
    const dispatch = useTeacherDispatch();

    useEffect(() => {
        if (discipline.activeDisciplineId === 1) {
            const promise = dispatch(fetchAlgorithms());
            return () => {
                promise.abort()
            }
        }
    }, [dispatch, discipline.activeDisciplineId]);

    if (algorithm.fetchLoading)
        return <Loader text="Загрузка алгоритмов..."/>;

    return <>{children}</>
};

export default AlgorithmsProvider;