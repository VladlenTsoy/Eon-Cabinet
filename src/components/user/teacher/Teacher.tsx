import React from 'react';
import {Provider} from "react-redux";
import {store} from "store/reducers/teacher/store";
import TeacherRoutes from "./Teacher.routes";

const Teacher: React.FC = () => {
    return <Provider store={store}>
        <TeacherRoutes/>
    </Provider>
};

export default Teacher;