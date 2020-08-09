import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {categorySelector} from "../../../../../store/access/teacher/category/categorySlice";
import {fetchCategories} from "../../../../../store/access/teacher/category/fetchCategories";
import {disciplineSelector} from "../../../../../store/access/teacher/discipline/disciplineSlice";
import {Loader} from "../../../../../lib/components";

const CategoriesProvider: React.FC = ({children}) => {
    const discipline = useSelector(disciplineSelector);
    const category = useSelector(categorySelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (discipline.activeDisciplineId)
            dispatch(fetchCategories());
    }, [dispatch, discipline.activeDisciplineId]);

    if (category.fetchLoading)
        return <Loader text="Загрузка категорий..."/>;

    return <>{children}</>
};

export default CategoriesProvider;