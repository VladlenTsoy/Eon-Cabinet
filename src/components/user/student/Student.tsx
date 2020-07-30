import React from 'react';
import {store} from "../../../store/reducers/student/store";
import {Provider} from "react-redux";
import StudentRoutes from "./Student.routes";
import CoinNotification from "./layouts/notifications/coin/CoinNotification";

const Student = () => <Provider store={store}>
    <StudentRoutes/>
    <CoinNotification/>
</Provider>;

export default Student;