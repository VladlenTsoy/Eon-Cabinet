import React from 'react';
import {Provider} from "react-redux";
import {store} from "store/reducers/teacher/store";
import TeacherSetting from "./TeacherSetting";

const TeacherProvider: React.FC = () => {
    return <Provider store={store}>
        <TeacherSetting/>
    </Provider>
};

export default TeacherProvider;