import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../../store/common/user/fetchUser";
import {userSelector} from "../../../store/common/user/userSlice";
import {Loader} from "../../components";

const UserProvider: React.FC = ({children}) => {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

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