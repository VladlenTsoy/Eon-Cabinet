import React from 'react';
import {store} from "../../../store/reducers/student/store";
import {Provider} from "react-redux";
import StudentRoutes from "./Student.routes";

const Student = () => <Provider store={store}>
    <StudentRoutes/>
</Provider>;

export default Student;