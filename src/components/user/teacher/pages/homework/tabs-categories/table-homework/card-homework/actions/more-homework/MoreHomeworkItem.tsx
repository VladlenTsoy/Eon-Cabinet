import React from 'react';
import {Divider, Row, Col} from 'antd';
import ExerciseLists from "../../../../../editor/tabs-tasks/added-exercises/exercise-lists/ExerciseLists";
import styled from "styled-components";
import moment from "moment";

const SubTitle = styled.p`
  color: ${props => props.theme.color_second};
`;

const MoreHomeworkItem: React.FC<any> = ({homework}) => {
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
        {homework.tasks ? homework.tasks.map((task: any, key: number) =>
            <ExerciseLists exercise={task} key={key}/>
        ) : null}
    </>
};

export default MoreHomeworkItem;