import React, {useState} from 'react';
import {UserImage} from "../../../../../../lib";
import {Card, Table} from "lib";
import moment from "moment";
import {Link} from "react-router-dom";
import TeacherModalMenu from "../TeacherModalMenu";

const InactiveAccountsTable: React.FC = () => {
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

    return <Card>
        <Card.Title title="Неактивные аккаунты" level={3}/>
        <Table
            columns={columns}
            url="/admin/inactive-teachers"
            loader={loader}
            setLoader={setLoader}/>
    </Card>
};

export default InactiveAccountsTable;