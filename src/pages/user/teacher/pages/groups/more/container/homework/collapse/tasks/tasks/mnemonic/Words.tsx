import React from "react"
import {TrophyOutlined} from "@ant-design/icons"

const Words = ({totals}: any) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Результат</th>
                    <th>Ответ ученика</th>
                    <th>Упражнение</th>
                </tr>
            </thead>
            <tbody>
                {totals.map((total: any, key: number) => (
                    <tr key={key}>
                        <td>{key + 1}</td>
                        <td>
                            <TrophyOutlined
                                className={`${
                                    total.result ? "warning" : "secondary"
                                }`}
                            />
                        </td>
                        <td>{total.user || "Пусто"}</td>
                        <td>{total.exercise.word}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Words
