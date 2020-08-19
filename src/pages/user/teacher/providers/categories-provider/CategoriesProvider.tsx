import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {categorySelector} from "../../../../../store/access/teacher/category/categorySlice";
import {fetchCategories} from "../../../../../store/access/teacher/category/fetchCategories";
import {disciplineSelector} from "../../../../../store/access/teacher/discipline/disciplineSlice";
import {Loader} from "../../../../../lib/ui";
import {useTeacherDispatch} from "../../../../../store/access/teacher/store";

const CategoriesProvider: React.FC = ({children}) => {
    const discipline = useSelector(disciplineSelector);
    const category = useSelector(categorySelector);
    const dispatch = useTeacherDispatch();

    useEffect(() => {
        if (discipline.activeDisciplineId){
          const promise = dispatch(fetchCategories());
          return () => {
              promise.abort()
          }
        }
    }, [dispatch, discipline.activeDisciplineId]);

    if (category.fetchLoading)
        return <Loader text="Загрузка категорий..."/>;

    return <>{children}</>
};

export default CategoriesProvider;