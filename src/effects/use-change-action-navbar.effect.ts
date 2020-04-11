import {useEffect} from "react";
import {appChangeActionNavbar} from "../store/app/actions";
import {useDispatch} from "react-redux";

export const useChangeActionNavbar = ({action}: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(appChangeActionNavbar(action));
        return () => {
            dispatch(appChangeActionNavbar(null));
        };
    }, [dispatch, action]);
};