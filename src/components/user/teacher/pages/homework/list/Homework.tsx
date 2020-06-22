import React from 'react';
import Container from "./container/Container";
import NavButtons from "./nav-buttons/NavButtons";
import {Spin} from "../../../../../../lib";
import {useSelector} from "react-redux";
import {homeworkSelector} from "../../../../../../store/reducers/teacher/homework/homeworkSlice";

const Homework: React.FC = () => {
    const {fetchLoading} = useSelector(homeworkSelector);
    return <>
        <NavButtons/>
        <Spin spinning={fetchLoading} tip="Загрузка...">
            <Container/>
        </Spin>
    </>;
};

export default Homework;

