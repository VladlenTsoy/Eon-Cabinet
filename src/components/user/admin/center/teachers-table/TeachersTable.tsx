import React from "react";
import TableComponent from "../../../../../lib/table/Table";
import {Card} from "lib";
import {UserImage} from "../../../../../layouts/components";
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Typography, Badge } from "antd";
import moment from "moment";
import TeacherTableDropdown from "./TeacherTableDropdown";

const {Text} = Typography;

interface TeachersTableProps {
    franchiseId: any;
    centerId: any;
    fetch: any;
    loader: boolean;
    setLoader: any;
}

const TeachersTable: React.FC<TeachersTableProps> = ({franchiseId, centerId, fetch, loader, setLoader}) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
        },
        {
            title: 'Фото',
            dataIndex: 'image',
            render: (text: any, record: any) =>
                <UserImage src={text} alt={record.first_name}/>
        },
        {
            title: 'Фамилия',
            dataIndex: 'last_name',
            sorter: true,
        },
        {
            title: 'Имя',
            dataIndex: 'first_name',
            sorter: true,
        },
        {
            title: 'Телефон',
            dataIndex: 'phone',
            render: (text: any) => text || <Text type="secondary">Пусто</Text>
        },
        {
            title: 'Почта',
            dataIndex: 'email',
            render: (text: any, record: any) => <>
                {text ?
                    record.email_verified_at ? <Badge status="success" text={text}/> :
                        <Badge status="error" text={text}/>
                    : <Text type="secondary">Пусто</Text>}
            </>
        },
        {
            title: 'Статус',
            filterMultiple: false,
            dataIndex: 'status',
            filters: [
                {text: <Badge status="success" text="Активный"/>, value: 'active'},
                {text: <Badge status="processing" text="Тестовый"/>, value: 'test'},
                {text: <Badge status="error" text="Скрыт"/>, value: 'hide'},
                {text: <Badge status="warning" text="Заблокирован"/>, value: 'block'},
            ],
            render: (text: any, record: any) => record.status === 'test' ?
                <Badge status="processing" text={text > 0 ? `${record.left_test_days} д.` : 'Заблокирован'}/> :
                record.delete_id ? <Badge status="error" text="Скрыт"/> :
                    record.is_blocked ? <Badge status="warning" text="Заблокирован"/> :
                        <Badge status="success" text="Активный"/>
        },
        {
            title: 'Логин',
            dataIndex: 'login',
            sorter: true,
        },
        {
            title: 'Создание',
            dataIndex: 'created_at',
            render: (text: any) => text ? moment(text).format('DD/MM/YYYY') : <Text type="secondary">Пусто</Text>,
            sorter: true,
        },
        {
            title: 'Активность',
            dataIndex: 'entrance_at',
            render: (text: any) => text ? moment(text).format('DD/MM/YYYY HH:mm') : <Text type="secondary">Пусто</Text>,
            sorter: true,
        },
        {
            title: <UserOutlined />,
            dataIndex: 'students',
            render: (text: any) => text !== 0 ? text : <Text type="secondary">{text}</Text>,
            sorter: true,
        },
        {
            title: 'Д.З.',
            dataIndex: 'homework',
            render: (text: any) => text !== 0 ? text : <Text type="secondary">{text}</Text>,
            sorter: true,
        },
        {
            title: <MenuOutlined />,
            render: (text: any, record: any) =>
                <TeacherTableDropdown
                    record={record}
                    fetch={fetch}
                    center_id={centerId}
                    franchise_id={franchiseId}
                />,
        }
    ];

    return <Card>
        <TableComponent
            url={`admin/teachers/center/${centerId}`}
            columns={columns}
            loader={loader}
            setLoader={setLoader}/>
    </Card>
};

export default TeachersTable;