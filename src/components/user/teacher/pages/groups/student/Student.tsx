import React from "react";
import {Col, Result, Row,} from "antd";
import {LoadingBlock, Card} from "lib";
import {useChangeTitle} from "../../../../../../hooks/use-change-title.effect";
import {useChangeActionNavbar} from "../../../../../../hooks/use-change-action-navbar.effect";
import {useApiUserGeneral} from "../../../../../../hooks/use-api-user-general.effect";
import Profile from "./profile/Profile";
import Homework from "./homework/Homework";
import Notification from "./notification/Notification";
import Tournaments from "../../home/short-info/tournaments/Tournaments";
import {Spin} from "../../../../../../lib";

interface StudentProps {
    match: any;
}

const Student: React.FC<StudentProps> = ({match}) => {
    const [loading, student, error, fetch] = useApiUserGeneral({url: `/teacher/student/${match.params.id}`});

    useChangeActionNavbar({action: 'back'});

    useChangeTitle({
        title: !loading && student ?
            `Ученик: ${student.first_name} ${student.last_name}` :
            error ? 'Ученик: Нет доступа' :
                'Ученик: Загрузка...'
    });

    return error ?
        <Card>
            <Result
                status="error"
                title="Нет доступа!"
                subTitle={error ? error.message : 'Нет доступа к данному профилю!'}
            />
        </Card> :
        <Row gutter={15}>
            {student ? <Notification student={student}/> : null}
            <Col xl={12} lg={12} xs={24}>
                <Spin spinning={loading && !!student} tip="Загрузка...">
                    {
                        loading && !student ? <LoadingBlock/> :
                            <Profile student={student} update={fetch}/>
                    }
                </Spin>
            </Col>
            <Col lg={6} md={12} sm={12} xs={24}>
                <Tournaments/>
            </Col>
            <Col lg={6} md={12} sm={12} xs={24}>
                <Tournaments/>
            </Col>
            <Homework id={match.params.id}/>
        </Row>;
};

export default Student;