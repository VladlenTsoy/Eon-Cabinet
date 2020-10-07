import React, {useEffect} from "react"
import {Divider, Row, Col, Empty} from 'antd';
import ExerciseLists from "../../../../../../../../../../../lib/components/exercise-lists/ExerciseLists";
import styled from "styled-components";
import moment from "moment";
import {LoadingBlock} from "lib/ui";
import {fetchExercisesByHomeworkId} from "../../../../../../../../../../../store/access/teacher/homework-exercises/fetchExercisesByHomeworkId"
import {useTeacherDispatch} from "../../../../../../../../../../../store/access/teacher/store"
import {
    useLoadingHomeworkExercises,
    useSelectHomeworkExercisesByHomeworkId
} from "../../../../../../../../../../../store/access/teacher/homework-exercises/homeworkExercisesSelectors"

const SubTitle = styled.p`
  color: ${props => props.theme.color_second};
`;

const MoreHomeworkItem: React.FC<any> = ({homework}) => {
    const exercises = useSelectHomeworkExercisesByHomeworkId(homework.id)
    const loading = useLoadingHomeworkExercises()
    const dispatch = useTeacherDispatch();

    useEffect(() => {
        const promise = dispatch(fetchExercisesByHomeworkId({homeworkId: homework.id}))
        return () => {
            promise.abort()
        }
    }, [dispatch, homework.id])

    return <>
        <Row>
            <Col span={12}>
                <SubTitle>Уровень:</SubTitle>
                {homework.level}
            </Col>
            <Col span={12}>
                <SubTitle>Дата создания:</SubTitle>
                {moment(homework.created_at).format('DD/MM/YYYY')}
            </Col>
        </Row>
        <Divider/>
        <SubTitle>Описание:</SubTitle>
        {homework.description}
        <Divider/>
        <SubTitle>Настройки:</SubTitle>
        {
            loading ? <LoadingBlock maxHeight="250px"/> :
                exercises.length ?
                    exercises.map((exercise: any, key: number) =>
                        <ExerciseLists exercise={exercise} key={key}/>
                    ) :
                    <Empty/>
        }
    </>
};

export default MoreHomeworkItem;