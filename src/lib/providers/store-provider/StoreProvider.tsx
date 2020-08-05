import React, {useEffect, useState} from 'react';
import {store} from "../../../store/store";
import {useSelector} from "react-redux";
import {userSelector} from "../../../store/common/user/userSlice";
import {Loader} from "../../components";

const StoreProvider: React.FC = ({children}) => {
    const user = useSelector(userSelector);
    const [loading, setLoading] = useState(!!user.detail);

    useEffect(() => {
        if (user.detail) {
            (async () => {
                setLoading(true);
                const {teacherReducer} = await import("../../../store/access/teacher/store");
                // @ts-ignore
                store.replaceReducer(teacherReducer)
                setLoading(false)
            })()
        } else
            setLoading(false);
    }, [user.detail]);

    if (loading)
        return <Loader text={`Загрузка пользователя...`}/>;

    return <>{children}</>;
};

export default StoreProvider;