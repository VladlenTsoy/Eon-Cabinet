import React, {useEffect} from "react";
import {Col, Result, Row,} from "antd";
import {LoadingBlock, Card} from "lib/ui";
import {useChangeTitle} from "../../../../../../hooks/use-change-title.effect";
import {useChangeActionNavbar} from "../../../../../../hooks/use-change-action-navbar.effect";
import Profile from "./profile/Profile";
import Homework from "./homework/Homework";
import Notification from "./notification/Notification";
import {Spin} from "../../../../../../lib/ui";
import {useSelector} from "react-redux";
import {useTeacherDispatch} from "../../../../../../store/access/teacher/store";
import {fetchStudent} from "../../../../../../store/access/teacher/students/selected/fetchStudent";
import {studentsSubSelector} from "../../../../../../store/access/teacher/students/studentsSlice";

interface StudentProps {
    match: any;
}

const Student: React.FC<StudentProps> = ({match}) => {
    const dispatch = useTeacherDispatch()
    const {loading, detail: student, error} = useSelector(studentsSubSelector('selected'))

    useChangeActionNavbar({action: 'back'});

    useChangeTitle({
        title: !loading && student ?
            `Ученик: ${student.first_name} ${student.last_name}` :
            error ? 'Ученик: Нет доступа' :
                'Ученик: Загрузка...'
    });

    useEffect(() => {
        const promise = dispatch(fetchStudent({studentId: Number(match.params.id)}))
        return () => {
            promise.abort()
        }
    }, [dispatch, match])

    if (error)
        return <Card>
            <Result
                status="error"
                title="Нет доступа!"
                subTitle={error ? error.message : 'Нет доступа к данному профилю!'}
            />
        </Card>

    return <>
        <Row gutter={15}>
            {student && <Notification student={student}/>}
            <Col xl={12} lg={12} xs={24}>
                <Spin spinning={loading && !!student} tip="Загрузка...">
                    {
                        loading || !student ? <LoadingBlock/> :
                            <Profile student={student}/>
                    }
                </Spin>
            </Col>
            {/*<Col lg={6} md={12} sm={12} xs={24}>*/}
            {/*    <Tournaments/>*/}
            {/*</Col>*/}
            {/*<Col lg={6} md={12} sm={12} xs={24}>*/}
            {/*    <Tournaments/>*/}
            {/*</Col>*/}
        </Row>
        <Homework id={match.params.id}/>
    </>
};

export default Student;