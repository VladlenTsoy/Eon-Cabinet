import React from "react";
import { TrophyOutlined } from '@ant-design/icons';

interface AdditionProps {
    totals: any;
}

const Anzan:React.FC<AdditionProps> = ({totals}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Результат</th>
                <th>Ответ ученика</th>
                <th>Правильный ответ</th>
                <th>Упражнение</th>
            </tr>
            </thead>
            <tbody>
            {totals.map((total: any, key: number) => <tr key={key}>
                <td>
                    {key + 1}
                </td>
                <td>
                    <TrophyOutlined
                        className={`${total.result === "true" ? 'text-warning' : 'text-secondary'}`} />
                </td>
                <td>
                    {total.user || 'Пусто'}
                </td>
                <td>
                    {total.answer}
                </td>
                <td>
                    {total.exercise.map((exercise: any) => exercise)}
                </td>
            </tr>)}
            </tbody>
        </table>
    );
};

export default Anzan;