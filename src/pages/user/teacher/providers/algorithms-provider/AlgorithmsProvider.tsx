import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {algorithmSelector} from "store/algorithm/algorithmSlice";
import {fetchAlgorithms} from "store/algorithm/fetchAlgorithms";
import {disciplineSelector} from "store/discipline/disciplineSlice";
import {Loader} from "../../../../../lib/ui";
import {useDispatch} from "store/store";

const AlgorithmsProvider: React.FC = ({children}) => {
    const discipline = useSelector(disciplineSelector);
    const algorithm = useSelector(algorithmSelector);
    const dispatch = useDispatch();

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
