import React, {useEffect, useState} from 'react';
import {store} from "../../../store/store";
import {useSelector} from "react-redux";
import {userSelector} from "../../../store/common/user/userSlice";
import {Loader} from "../../components";
import {useLanguage} from "../../../hooks/use-language.hook";

const StoreProvider: React.FC = ({children}) => {
    const {l} = useLanguage();
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
        return <Loader text={`${l('loading_user')}...`}/>;

    return <>{children}</>;
};

export default StoreProvider;