import React from 'react';
import {Table, ButtonLink} from "lib";
import {Card} from "lib";
import moment from 'moment';
import {Badge, Tag} from "antd";
import styled from "styled-components";

const TimeDateWrapper = styled.div`
  .time{
    font-size: 16px;
  }
  
  .slash{
    margin: 0 0.25rem;
    color: ${props => props.theme.color_minimal}
  }
`;

interface FutureOlympiadsProps {

}

const FutureOlympiads: React.FC<FutureOlympiadsProps> = () => {
    const momentFormatCheckYear = (date: any, formatOne: string, formatTwo: string) => {
        const years = moment(date).diff(date, 'years', false);
        return moment(date).format(years ? formatTwo : formatOne);
    };

    const Columns = [
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
            title: 'Дата начала',
            dataIndex: 'current_step.start_at',
            render: (text: string) => <TimeDateWrapper>
                <span className="time">{moment(text).format('HH:mm')}</span>
                <span className="slash">/</span>
                {momentFormatCheckYear(text, 'DD MMM', 'DD.MM.YY')}
            </TimeDateWrapper>
        }, {
            title: 'Создан',
            dataIndex: 'created_at',
            sorter: true,
            render: (text: string) => momentFormatCheckYear(text, 'DD MMMM', 'DD.MM.YY')
        }, {
            render: (text: string, record: any) =>
                <ButtonLink to={`/olympiad/${record.id}`} type="link" size="small">
                    Подробнее
                </ButtonLink>
        }
    ];

    return <Card>
        <Card.Title title="Будущие олимпиады" level={4}/>
        <Table columns={Columns} url="/teacher/olympiads/future/table" search={false}/>
    </Card>;
};

export default FutureOlympiads;