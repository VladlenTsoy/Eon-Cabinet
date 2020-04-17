import React from "react";
import {TrophyOutlined} from '@ant-design/icons';

interface AdditionProps {
    totals: any;
    setting: any;
}

const Anzan: React.FC<AdditionProps> = ({totals, setting}) => {
    const isMultiplication = setting.mode === 'divide' || setting.mode === 'multiply';

    return <table>
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
        {totals.map((total: any, key: number) =>
            total ?
                <tr key={key}>
                    <td>
                        {key + 1}
                    </td>
                    <td>
                        <TrophyOutlined
                            className={`${total.result ? 'warning' : 'secondary'}`}/>
                    </td>
                    <td>
                        {total.user || 'Пусто'}
                    </td>
                    <td>
                        {total.answer}
                    </td>
                    <td>
                        {isMultiplication ? total.exercise : total.exercise.join(', ')}
                    </td>
                </tr> : null
        )}
        </tbody>
    </table>
};

export default Anzan;