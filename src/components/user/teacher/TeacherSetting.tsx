import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {disciplineSelector} from "../../../store/reducers/teacher/discipline/disciplineSlice";
import {categorySelector} from "../../../store/reducers/teacher/category/categorySlice";
import {fetchDisciplines} from "../../../store/reducers/teacher/discipline/fetchDisciplines";
import {fetchCategories} from "../../../store/reducers/teacher/category/fetchCategories";
import {fetchAlgorithms} from "../../../store/reducers/teacher/algorithm/fetchAlgorithms";
import {Loader} from "../../../lib";
import TeacherRoutes from "./TeacherRoutes";
import {algorithmSelector} from "../../../store/reducers/teacher/algorithm/algorithmSlice";

const TeacherSetting = () => {
    const discipline = useSelector(disciplineSelector);
    const category = useSelector(categorySelector);
    const algorithm = useSelector(algorithmSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(fetchDisciplines());
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            if (discipline.activeDisciplineId) {
                await dispatch(fetchCategories(discipline.activeDisciplineId));
                if (Number(discipline.activeDisciplineId) === 1)
                    await dispatch(fetchAlgorithms());
            }
        })();
    }, [dispatch, discipline.activeDisciplineId]);

    if (discipline.fetchLoading)
        return <Loader text="Загрузка дисциплин..."/>;

    if (category.fetchLoading)
        return <Loader text="Загрузка категорий..."/>;

    if (algorithm.fetchLoading)
        return <Loader text="Загрузка алгоритмов..."/>;

    return <TeacherRoutes/>;
};

export default TeacherSetting;