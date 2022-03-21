import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {fetchCategories} from "store/category/fetchCategories";
import {disciplineSelector} from "store/discipline/disciplineSlice";
import {Loader} from "../../../../../lib/ui";
import {useDispatch} from "store/store";
import {useLoadingCategories} from "store/category/categorySelectors";

const CategoriesProvider: React.FC = ({children}) => {
    const discipline = useSelector(disciplineSelector);
    const loading = useLoadingCategories()
    const dispatch = useDispatch();

    useEffect(() => {
        if (discipline.activeDisciplineId){
          const promise = dispatch(fetchCategories());
          return () => {
              promise.abort()
          }
        }
    }, [dispatch, discipline.activeDisciplineId]);

    if (loading)
        return <Loader text="Загрузка категорий..."/>;

    return <>{children}</>
};

export default CategoriesProvider;
