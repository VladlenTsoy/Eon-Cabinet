import React from 'react';
import {Card} from "lib";
import {ButtonLink, Table} from "lib";
import {Badge, Tag} from "antd";
import moment from "moment";
import {useChangeActionNavbar} from "../../../../../../effects/use-change-action-navbar.effect";

interface HistoryOlympiadProps {
}

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        defaultSortOrder: 'descend',
        sorter: true,
    }, {
        title: 'Название',
        dataIndex: 'title',
    }, {
        title: 'Этапов',
        dataIndex: 'steps_count',
        sorter: true,
    }, {
        title: 'Доступ',
        dataIndex: 'access',
        filters: [
            {text: <Badge status="success" text="Открытый"/>, value: 'public'},
            {text: <Badge status="warning" text="Запрос"/>, value: 'invite'},
            {text: <Badge status="error" text="Закрытый"/>, value: 'private'},
        ],
        render: (text: string) =>
            text === 'public' ?
                <Tag color="#5cb860">Открытый</Tag> :
                text === 'invite' ?
                    <Tag color="#ff9800">Запрос</Tag> :
                    <Tag color="#f55a4e">Закрытый</Tag>
    }, {
        title: 'Дисциплина',
        dataIndex: 'method_id',
        filters: [
            {text: 'Ментальная арифметика', value: '1'},
            {text: 'Мнемотехника', value: '2'},
        ],
        render: (text: string, record: any) => record.discipline
    }, {
        title: 'Начало',
        dataIndex: 'last_step.start_at',
        render: (text: string) => moment(text).format('HH:mm DD/MM/YY')
    }, {
        title: 'Конец',
        dataIndex: 'last_step.end_at',
        render: (text: string) => moment(text).format('HH:mm DD/MM/YY')
    }, {
        title: 'Создан',
        dataIndex: 'created_at',
        sorter: true,
        render: (text: string) => moment(text).format('DD/MM/YY')
    }, {
        render: (text: string, record: any) =>
            <ButtonLink to={`/olympiad/${record.id}`} type="link" size="small">
                Подробнее
            </ButtonLink>
    }
];

const HistoryOlympiad: React.FC<HistoryOlympiadProps> = () => {
    useChangeActionNavbar({action: 'back'});

    return <Card>
        <Card.Title title="Прошедшие олимпиады" level={4}/>
        <Table columns={columns} url="/teacher/olympiad/history/table"/>
    </Card>;
};

export default HistoryOlympiad;