import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {changeTitle} from "../store/common/app/appSlice";

export const useChangeTitle = ({title}: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeTitle(title));
    }, [title, dispatch]);
};