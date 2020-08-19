import React, {useEffect, useState} from 'react';
import {store} from "../../../store/store";
import {Loader} from "../../ui";
import {useUser} from "../../../hooks/use-user";

const StoreProvider: React.FC = ({children}) => {
    const {user} = useUser();
    const [loading, setLoading] = useState(!!user);

    useEffect(() => {
        if (user?.id) {
            (async () => {
                // setLoading(true)
                const {teacherReducer} = await import("../../../store/access/teacher/store")
                // @ts-ignore
                store.replaceReducer(teacherReducer)
                setLoading(false)
            })()
        } else
            setLoading(false);
    }, [user]);

    if (loading)
        return <Loader text={`Загрузка пользователя...`}/>;

    return <>{children}</>;
};

export default StoreProvider;