import {useEffect} from "react";
import {appChangeTitleNavbar} from "../store/reducers/common/app/actions";
import {useDispatch} from "react-redux";

export const useChangeTitle = ({title}: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appChangeTitleNavbar(title));
    }, [title, dispatch]);
};