import React from "react"
import UsingTablePagination from "../../../../../../lib/table-pagination/usingTablePagination"
import {Legend} from "lib"
import {Button, Tag} from "antd"
import Timer from "react-compound-timer"
import moment from "moment"
import Action from "./action/Action"

interface AvailableProps {
    setKey: any
}

const Available:React.FC<AvailableProps> = ({setKey}) => {

    const columns = (fetch: any) => [
        {
            title: "ID",
            dataIndex: "id"
        },
        {
            title: "Название",
            dataIndex: "title"
        },
        {
            title: "Участников",
            dataIndex: "students_count"
        },
        {
            title: "Доступ",
            dataIndex: "access",
            render: (text: string) =>
                text === "public" ?
                    <Tag color="#5cb860">Открытый</Tag> :
                    <Tag color="#ff9800">Запрос</Tag>
        },
        {
            title: "Старт через",
            dataIndex: ["current_step", "start_at"],
            render: (text: string) =>
                moment().isBefore(text) ?
                    <Timer
                        formatValue={(value: any) => value < 10 ? `0${value}` : value}
                        initialTime={moment(text).valueOf() - moment().valueOf()}
                        direction="backward"
                        checkpoints={[
                            {
                                time: 1000,
                                callback: fetch
                            }
                        ]}
                    >
                        <Timer.Days/> д. <Timer.Hours/>:<Timer.Minutes/>:<Timer.Seconds/>
                    </Timer> :
                    <div>Началась</div>
        },
        {
            render: (_: any, record: any) =>
                record.participate ?
                    <Button disabled>Ожидание...</Button> :
                    <Action olympiad={record} fetch={() => {
                        setKey((key: number) => ++key)
                        fetch()
                    }}/>

        }
    ]

    return <>
        <Legend>Доступные олимпиад</Legend>
        <UsingTablePagination
            isSearch={false}
            url="/student/olympiads/available/paginate"
            columns={columns}
        />
    </>
}

export default Available