import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { Tag, Typography } from "antd";
import {Link} from "react-router-dom";
import {UserImage, Legend} from "../../../../../layouts/components";
import {CardTable} from "lib";
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect";
import moment from "moment";
import styled from "styled-components";

const {Text} = Typography;

const ProfileColumn = styled.span`
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: left;
`;

interface RecordProps {
    id: number;
    student: {
        id: number;
        image: string;
        first_name: string;
        last_name: string;
        group: string;
        group_id: number;
    };
    level: number;
    status: number;
    sent_at: string;
}

const columns = [{
    title: 'ID',
    dataIndex: 'id',
}, {
    title: 'Ученик',
    render: (text: any, record: RecordProps) => <ProfileColumn>
        <UserImage
            mr="0.75rem"
            src={record.student.image}
            alt={`${record.student.first_name} ${record.student.last_name}`}
        />
        {record.student.first_name} {record.student.last_name}
    </ProfileColumn>
}, {
    title: 'Группа',
    render: (text: any, record: RecordProps) =>
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
    render: (text: any) => moment(text).format('HH:mm DD/MM/YYYY')
}, {
    title: 'Дата выполнения',
    dataIndex: 'completed_at',
    render: (text: any) => text ? moment(text).format('HH:mm DD/MM/YYYY') : <Text type="secondary">Пусто</Text>
}, {
    title: <MenuOutlined />,
    render: (text: any, record: RecordProps) =>
        <Link to={`/groups/${record.student.group_id}/student/${record.student.id}`}>Подробнее</Link>
}];


const LastExecuted = () => {
    const [loading, data] = useApiUserGeneral({url: '/teacher/students/homework/done', initValue: []});

    return <>
        <Legend>Домашние задания</Legend>
        <CardTable
            columns={columns}
            rowKey={(record: RecordProps) => record.id}
            dataSource={data}
            pagination={false}
            loading={loading}/>
    </>;
};

export default LastExecuted;