import React, {useCallback, useEffect, useState} from "react";
import {CardTable} from "lib";
import {Table, Typography} from "antd";
import moment from "moment";
import {useSelector} from "react-redux";

const {Text} = Typography;

const columns = [
    {title: 'ID', dataIndex: 'id', key: 'id'},
    {title: 'Название', dataIndex: 'title', key: 'title'},
    {
        title: 'Учителей',
        dataIndex: 'teachers',
        key: 'teachers',
        render: (val: any) => <span><Text type="secondary">{val.all} /</Text> {val.open}</span>
    },
    {title: 'Групп', dataIndex: 'groups', key: 'groups'},
    {
        title: 'Учеников',
        dataIndex: 'students',
        key: 'students',
        render: (val: any) => <span><Text type="secondary">{val.all} /</Text> {val.open}</span>
    },
];

const expandedRowRender = (data: any) => {
    const columns = [
        {title: 'ID', dataIndex: 'id', key: 'id'},
        {title: 'Имя', dataIndex: 'full_name', key: 'full_name'},
        {title: 'Логин', dataIndex: 'login', key: 'login'},
        {
            title: 'Создан', dataIndex: 'created_at', key: 'created_at',
            render: (text: any) => text ? moment(text).format('DD/MM/YYYY HH:mm') : 'до 2019',
        },
        {
            title: 'Последний вход', dataIndex: 'entrance_at', key: 'entrance_at',
            render: (text: any) => text ? moment(text).format('DD/MM/YYYY HH:mm') : 'Пусто',
        },
        {
            title: 'Учеников',
            dataIndex: 'students',
            key: 'students',
            render: (val: any) => <span><Text type="secondary">{val.all} /</Text> {val.open}</span>
        },
    ];

    return <Table
        rowClassName={(record: any) => record.isBlocked ? 'center-stats-teacher-block' : ''}
        size="small"
        rowKey="id"
        columns={columns}
        dataSource={data.more}
        pagination={false}/>;
};

const TableCentersStatistic: React.FC<any> = ({url}) => {
    const {api} = useSelector((state: any) => (state));
    const [centers, setCenters] = useState([]);
    const [loader, setLoader] = useState(false);

    const fetch = useCallback(async () => {
        const response = await api.user.get(url);
        setCenters(response.data);
    }, [api.user, url]);

    useEffect(() => {
        (async () => {
            setLoader(true);
            await fetch();
            setLoader(false);
        })();
    }, [fetch]);

    return <CardTable
        size="small"
        loading={loader}
        columns={columns}
        rowKey="id"
        pagination={false}
        expandedRowRender={expandedRowRender}
        dataSource={centers}
    />;
};

export default TableCentersStatistic;