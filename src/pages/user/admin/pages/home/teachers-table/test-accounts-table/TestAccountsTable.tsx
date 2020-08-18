import React, {useState} from 'react';
import {UserImage} from "../../../../../../../lib/components";
import {Card, Table} from "lib/components";
import moment from "moment";
import {Typography} from "antd";
import {Link} from "react-router-dom";
import TeacherModalMenu from "../TeacherModalMenu";

const {Text} = Typography;

const TestAccountsTable: React.FC = () => {
    const [loader, setLoader] = useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
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
        },
        {
            title: 'Логин',
            dataIndex: 'login',
            sorter: true,
        },
        {
            title: 'Центр',
            dataIndex: 'center_id',
            sorter: true,
            render: (text: any, record: any) =>
                <Link to={`/franchises/${record.franchise_id}/centers/${record.center_id}`}>{record.center}</Link>
        },
        {
            title: 'Осталось',
            dataIndex: 'left_test_days',
            render: (text: any) => text > 0 ? `${text} д.` : <Text type="danger">Заблокированный</Text>,
        },
        {
            title: 'Создание',
            dataIndex: 'created_at',
            render: (text: any) => text ? moment(text).format('DD/MM/YYYY') : 'Неизвестно',
            sorter: true,
        },
        {
            title: 'Активность',
            dataIndex: 'entrance_at',
            render: (text: any) => text ? moment(text).format('DD/MM/YYYY HH:mm') : 'Пусто',
            sorter: true,
        },
        {
            render: (text: any, record: any) =>
                <TeacherModalMenu record={record} setLoader={setLoader}/>,
        }
    ];

    return <>
        <Card>
            <Card.Title title="Тестовые аккаунты" level={3}/>
            <Table
                columns={columns}
                url="/admin/ending-test-teachers"
                loader={loader}
                setLoader={setLoader}/>
        </Card>
    </>
};

export default TestAccountsTable;