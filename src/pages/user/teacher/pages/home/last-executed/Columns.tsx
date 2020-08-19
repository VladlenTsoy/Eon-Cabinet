import {Tag, Typography} from "antd";
import styled from "styled-components";
import {UserImage} from "../../../../../../lib/ui";
import {Link} from "react-router-dom";
import moment from "moment";
import React from "react";
import {InfoCircleOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {RecentHomeworkDetails} from "../../../../../../store/access/teacher/students/recent-homework/recentHomework";

const {Text} = Typography;

const ProfileColumn = styled.span`
    display: flex;
    align-items: center;
    justify-content: left;
`;

type ColumnsProps = () => ColumnsType<RecentHomeworkDetails>

const Columns: ColumnsProps = () => [
    {
        title: 'Ученик',
        render: (text, record) =>
            <ProfileColumn>
                <UserImage
                    mr="0.75rem"
                    src={record.student.image}
                    alt={`${record.student.first_name} ${record.student.last_name}`}
                />
                {record.student.first_name} {record.student.last_name}
            </ProfileColumn>
    }, {
        title: 'Группа',
        render: (text, record) =>
            <Link to={`/groups/${record.student.group_id}`}>{record.student.group}</Link>
    }, {
        title: 'Уровень',
        dataIndex: 'level',
    }, {
        title: 'Статус',
        dataIndex: 'status',
        render: (text) => text === 1 ?
            <Tag color="#5cb860">Выполнил</Tag> :
            <Tag color="#f55a4e">Не выполнил</Tag>
    }, {
        title: 'Дата отправки',
        dataIndex: 'created_at',
        render: (text) =>
            moment(text).format('HH:mm DD/MM/YYYY')
    }, {
        title: 'Дата выполнения',
        dataIndex: 'completed_at',
        render: (text) =>
            text ? moment(text).format('HH:mm DD/MM/YYYY') : <Text type="secondary">Пусто</Text>
    }, {
        render: (text, record) =>
            <Link to={`/groups/${record.student.group_id}/student/${record.student.id}/homework/${record.id}`}>
                <InfoCircleOutlined/> Подробнее
            </Link>
    }
];

export default Columns;