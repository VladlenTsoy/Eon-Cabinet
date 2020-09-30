import React from "react"
import CoinsColumn from "./coins/CoinsColumn"
import moment from "moment"
import {momentFormatCheckYear} from "../../../../../../../../../utils/momentFormatCheckYear"

const DataColumns = () => {
    const empty = <span className="minimal">Пусто</span>

    return [
        {
            title: "Монеты",
            dataIndex: "coins",
            render: (text: any) => <CoinsColumn coins={text} />
        },
        {
            title: "Почта",
            dataIndex: "email",
            render: (text: any) => text || empty
        },
        {
            title: "Телефон",
            dataIndex: "phone",
            render: (text: any) => text || empty
        },
        {
            title: "Логин",
            dataIndex: "login",
            render: (text: any) => text || empty
        },
        {
            title: "Дата рождения",
            dataIndex: "date_of_birth",
            render: (text: any) =>
                text ? moment(text).format("DD/MM/YYYY") : empty
        },
        {
            title: "Последняя активность",
            dataIndex: "entrance_at",
            render: (text: any) =>
                text
                    ? momentFormatCheckYear(
                          text,
                          "HH:mm DD MMM",
                          "HH:mm DD.MM.YY"
                      )
                    : empty
        },
        {
            title: "Создан",
            dataIndex: "created_at",
            render: (text: any) =>
                text ? momentFormatCheckYear(text, "DD MMM", "DD.MM.YY") : empty
        }
    ]
}

export default DataColumns
