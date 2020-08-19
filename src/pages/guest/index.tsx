import React from 'react';
import {Loader} from "../../lib/ui";
import {useRouteMatch} from "react-router-dom";

const Auth = React.lazy(() => import("./auth/index"));
const Homework = React.lazy(() => import("./homework/index"));

const Index = () => {
    const match = useRouteMatch({path: '/guest'});

    return <React.Suspense fallback={<Loader text="Загрузка доступа..."/>}>
        {match ? <Homework/> : <Auth/>}
    </React.Suspense>
};

export default Index;