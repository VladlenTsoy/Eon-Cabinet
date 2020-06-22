import React from 'react';
import {Divider, Row, Col, Empty} from 'antd';
import ExerciseLists from "../../../../../../editor/tabs-tasks/added-exercises/exercise-lists/ExerciseLists";
import styled from "styled-components";
import moment from "moment";
import {useApiUserGeneral} from "hooks/use-api-user-general.effect";
import {LoadingBlock} from "lib";

const SubTitle = styled.p`
  color: ${props => props.theme.color_second};
`;

const MoreHomeworkItem: React.FC<any> = ({homework}) => {
    const [loading, tasks] = useApiUserGeneral({url: `/teacher/tasks/homework/${homework.id}`, initValue: []});
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
                tasks.length ?
                    tasks.map((task: any, key: number) =>
                        <ExerciseLists exercise={task} key={key}/>
                    ) :
                    <Empty/>
        }
    </>
};

export default MoreHomeworkItem;