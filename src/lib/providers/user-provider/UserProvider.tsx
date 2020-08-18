import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {fetchUser} from "../../../store/common/user/fetchUser";
import {userSelector} from "../../../store/common/user/userSlice";
import {Loader} from "../../components";
import {useCommonDispatch} from "../../../store/common/store";

const UserProvider: React.FC = ({children}) => {
    const user = useSelector(userSelector);
    const dispatch = useCommonDispatch();

    useEffect(() => {
        const promise = dispatch(fetchUser());
        return () => {
            promise.abort();
        }
    }, [dispatch, user.token]);

    if (user.loading)
        return <Loader text={`Загрузка пользователя...`}/>;

    return <>{children}</>;
};

export default UserProvider;