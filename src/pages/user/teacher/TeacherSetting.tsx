import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {disciplineSelector} from "../../../store/access/teacher/discipline/disciplineSlice";
import {categorySelector} from "../../../store/access/teacher/category/categorySlice";
import {fetchDisciplines} from "../../../store/access/teacher/discipline/fetchDisciplines";
import {fetchCategories} from "../../../store/access/teacher/category/fetchCategories";
import {fetchAlgorithms} from "../../../store/access/teacher/algorithm/fetchAlgorithms";
import {Loader} from "../../../lib/components";
import TeacherRoutes from "./TeacherRoutes";
import {algorithmSelector} from "../../../store/access/teacher/algorithm/algorithmSlice";

const TeacherCategories = () => {
    const discipline = useSelector(disciplineSelector);
    const category = useSelector(categorySelector);
    const algorithm = useSelector(algorithmSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (discipline.activeDisciplineId) {
                dispatch(fetchCategories());
                if (discipline.activeDisciplineId === 1)
                    dispatch(fetchAlgorithms());
            }
        })();
    }, [dispatch, discipline.activeDisciplineId]);

    if (category.fetchLoading)
        return <Loader text="Загрузка категорий..."/>;

    if (algorithm.fetchLoading)
        return <Loader text="Загрузка алгоритмов..."/>;

    return <TeacherRoutes/>;
}

const TeacherSetting = () => {
    const discipline = useSelector(disciplineSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(fetchDisciplines());
        })();
    }, [dispatch]);

    if (discipline.fetchLoading)
        return <Loader text="Загрузка дисциплин..."/>;

    return <TeacherCategories/>;
};

export default TeacherSetting;