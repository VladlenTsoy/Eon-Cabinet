import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Typography} from "antd";
import {CardTable, LoadingBlock} from "lib";
import {Navigation} from "../../../../layouts/components";
import moment from "moment";
import ExportToExcel from "./ExportToExcel";
import {useChangeActionNavbar} from "../../../../effects/use-change-action-navbar.effect";

const {Text} = Typography;

let columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        key: 'id',
    },
    {
        title: 'Имя',
        render: (record: any) => <div>{record.first_name} {record.last_name}</div>
    },
    {
        title: 'Логин',
        dataIndex: 'login',
        key: 'login',
    },
    {
        title: 'Центр',
        dataIndex: 'center',
        key: 'center',
    },
    {
        title: 'Франшиза',
        dataIndex: 'franchise',
        key: 'franchise',
    },
    {
        title: 'Создан',
        dataIndex: 'created_at',
        render: (text: any) => text ? moment(text).format('DD/MM/YYYY HH:mm') : 'до н.э.',
        sorter: (a: any, b: any) => moment(b.created_at).diff(moment(a.created_at), 'days'),
    },
    {
        title: 'Активность',
        dataIndex: 'entrance_at',
        render: (text: any) => text ? moment(text).format('DD/MM/YYYY HH:mm') : 'Пусто',
        defaultSortOrder: 'ascend',
        sorter: (a: any, b: any) => moment(b.entrance_at).diff(moment(a.entrance_at), 'days'),
    },
    {
        title: 'Ученики',
        render: (record: any) => <div><Text type="secondary">{record.students.all}</Text> \ {record.students.open}</div>
    },
];

const FranchisesStatistic: React.FC = () => {
    const {api} = useSelector((state: any) => (state));
    const [teaches, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);

    useChangeActionNavbar({action: 'back'});

    const fetchTeacher = useCallback(async () => {
        const response = await api.user.get(`/admin/check/teachers`);
        setTeachers(response.data);
    }, [api.user]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchTeacher();
            setLoading(false);
        })();
    }, [fetchTeacher]);

    const checkRowClass = (record: any) => {
        if (moment().diff(moment(record.entrance_at), 'days') < 15)
            return 'center-stats-teacher-test';

        return '';
    };

    return <>
        <Navigation>
            <ExportToExcel/>
        </Navigation>
        {teaches ? <CardTable
            rowClassName={checkRowClass}
            rowKey={(record: any) => record.id}
            columns={columns}
            loading={loading}
            dataSource={teaches}
            pagination={false}
        /> : <LoadingBlock/>}
    </>
};

export default FranchisesStatistic;