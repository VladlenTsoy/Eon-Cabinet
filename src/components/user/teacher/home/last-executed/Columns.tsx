import {Tag, Typography} from "antd";
import styled from "styled-components";
import {UserImage} from "../../../../../layouts/components";
import {Link} from "react-router-dom";
import moment from "moment";
import React from "react";
import {InfoCircleOutlined} from "@ant-design/icons";

const {Text} = Typography;

const ProfileColumn = styled.span`
    display: flex;
    align-items: center;
    justify-content: left;
`;


const Columns = () => [
    {
        title: 'Ученик',
        render: (text: any, record: any) =>
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
        render: (text: any, record: any) =>
            <Link to={`/groups/${record.student.group_id}`}>{record.student.group}</Link>
    }, {
        title: 'Уровень',
        dataIndex: 'level',
    }, {
        title: 'Статус',
        dataIndex: 'status',
        render: (text: number) => text === 1 ?
            <Tag color="#5cb860">Выполнил</Tag> :
            <Tag color="#f55a4e">Не выполнил</Tag>
    }, {
        title: 'Дата отправки',
        dataIndex: 'created_at',
        render: (text: any) =>
            moment(text).format('HH:mm DD/MM/YYYY')
    }, {
        title: 'Дата выполнения',
        dataIndex: 'completed_at',
        render: (text: any) =>
            text ? moment(text).format('HH:mm DD/MM/YYYY') : <Text type="secondary">Пусто</Text>
    }, {
        render: (text: any, record: any) =>
            <Link to={`/groups/${record.student.group_id}/student/${record.student.id}/homework/${record.id}`}>
                <InfoCircleOutlined/> Подробнее
            </Link>
    }
];

export default Columns;