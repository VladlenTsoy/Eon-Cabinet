import React from 'react';
import { TrophyOutlined } from '@ant-design/icons';

interface MasterySystemProps {
    totals: any;
}

const MasterySystem: React.FC<MasterySystemProps> = ({totals}) => {
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
            {
                totals.map((total: any, key: number) =>
                    <tr key={key}>
                        <td>
                            {key + 1}
                        </td>
                        <td>
                            <TrophyOutlined className={`${total.result ? 'warning' : 'secondary'}`} />
                        </td>
                        <td>
                            {total.user || 'Пусто'}
                        </td>
                        <td>
                            {total.exercise.number}
                        </td>
                        <td>
                            {total.exercise.word}
                        </td>
                    </tr>
                )
            }
            </tbody>
        </table>
    );
};

export default MasterySystem;