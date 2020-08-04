import React from "react";
import { TrophyOutlined } from '@ant-design/icons';

interface DigitalRowProps {
    totals: any;
}

const DigitalRow: React.FC<DigitalRowProps> = ({totals}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Результат</th>
                <th>Ответ ученика</th>
                <th colSpan={2}>Упражнение</th>
            </tr>
            </thead>
            <tbody>
            {totals.map((total: any, tKey: number) =>
                total ?
                    String(total.exercise)
                        .split('')
                        .map((exercise: any, key: number) =>
                            <tr key={`${tKey}${key}`}>
                                <td>
                                    {key + 1}
                                </td>
                                <td>
                                    <TrophyOutlined
                                        className={`${
                                            String(total.exercise).split('')[key] === String(total.user).split('')[key] ?
                                                'warning' : 'secondary'
                                        }`} />
                                </td>
                                <td>
                                    {String(total.user).split('')[key] || 'Пусто'}
                                </td>
                                <td>
                                    {exercise}
                                </td>
                            </tr>
                        ) : null
            )}
            </tbody>
        </table>
    );
};
export default DigitalRow;