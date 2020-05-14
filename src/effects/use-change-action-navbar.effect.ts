import {useEffect, useState} from "react";
import {appChangeActionNavbar} from "../store/app/actions";
import {useDispatch} from "react-redux";

type Props = (params: { action: string }) => void

export const useChangeActionNavbar: Props = ({action}) => {
    const [appAction] = useState(action);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appChangeActionNavbar(appAction));
        return () => {
            dispatch(appChangeActionNavbar(null));
        };
    }, [dispatch, appAction]);
};