import {useEffect, useState} from "react";
import {changeAction} from "../store/reducers/common/app/appSlice";
import {useDispatch} from "react-redux";

type Props = (params: { action: string }) => void

export const useChangeActionNavbar: Props = ({action}) => {
    const [appAction] = useState(action);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeAction(appAction));
        return () => {
            dispatch(changeAction(null));
        };
    }, [dispatch, appAction]);
};