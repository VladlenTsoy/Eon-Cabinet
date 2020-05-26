import React from 'react';
import UsingTablePagination from "lib/table-pagination/usingTablePagination";
import {Tag} from "antd";
import moment from "moment";
import Timer from "react-compound-timer";

const columns = (fetch: any) => [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Название',
        dataIndex: 'title',
    },
    {
        title: 'Доступ',
        dataIndex: 'access',
        render: (text: string) =>
            text === 'public' ?
                <Tag color="#5cb860">Открытый</Tag> :
                    <Tag color="#ff9800">Запрос</Tag>
    },
    {
        title: 'Старт через',
        dataIndex: 'start_at',
        render: (text: string) =>
            <Timer
                formatValue={(value: any) => value < 10 ? `0${value}` : value}
                initialTime={moment(text).valueOf() - moment().valueOf()}
                direction="backward"
                checkpoints={[
                    {
                        time: 1000,
                        callback: fetch,
                    }
                ]}
            >
                <Timer.Days/> д. <Timer.Hours/>:<Timer.Minutes/>:<Timer.Seconds/>
            </Timer>
    },
];

const Invite: React.FC = () => {
    return <UsingTablePagination
        isSearch={false}
        url="/student/olympiads/invite/available/table"
        columns={columns}
    />;
};

export default Invite;