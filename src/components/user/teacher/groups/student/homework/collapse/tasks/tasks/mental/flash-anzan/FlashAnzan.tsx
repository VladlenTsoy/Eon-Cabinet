import React from 'react';
import ResultMoreLayout from "../../../../../../../../../general/tasks/layouts/result/result-more/ResultMore.layout";
import {TrophyOutlined} from '@ant-design/icons';

interface FlashAnzanProps {
    totals: any;
}

const FlashAnzan:React.FC<FlashAnzanProps> = ({totals}) => {
    return <ResultMoreLayout
        header={
            <tr>
                <th className="number">#</th>
                <th>Результат</th>
                <th>Правильный ответ</th>
                <th>Ваш ответ</th>
                <th className="exercises">Задание</th>
            </tr>
        }>
        {
            totals.map((total: any, keyExercise: number) =>
                <tr key={keyExercise}>
                    <td className="number">
                        {keyExercise + 1}
                    </td>
                    <td className={`trophy ${total.result ? 'warning' : 'second'}`}>
                        <TrophyOutlined/>
                    </td>
                    <td className="answer">
                        {total.answer}
                    </td>
                    <td className={`user ${total.result ? 'success' : 'danger'}`}>
                        {total.user !== undefined ? total.user : 'Пусто'}
                    </td>
                    <td className="exercises">
                        {total.exercise}
                    </td>
                </tr>
            )
        }
    </ResultMoreLayout>;
};

export default FlashAnzan;