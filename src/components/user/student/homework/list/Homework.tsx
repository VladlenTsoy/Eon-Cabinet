import React from 'react';
import {Row, Col} from 'antd';
import Rating from "./rating/Rating";
import HomeworkBlock from "../../layouts/homework-block/HomeworkBlock";
import {LoadingBlock} from "lib";
import {useApiUserGeneral} from "../../../../../hooks/use-api-user-general.effect";

const Homework = () => {
    const [loading, homework] = useApiUserGeneral({url: 'student/homework/all'});

    return <Row  gutter={15}>
        {loading ?
            <LoadingBlock/> :
            homework.map((val: any, key: number) =>
                <Col xl={6} sm={12} xs={24} key={key}>
                    <HomeworkBlock homework={val}/>
                </Col>
            )
        }
        <Col xl={24}>
            <Rating/>
        </Col>
    </Row>;
};

export default Homework;