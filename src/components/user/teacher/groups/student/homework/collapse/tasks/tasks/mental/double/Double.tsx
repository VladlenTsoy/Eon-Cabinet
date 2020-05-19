import React from 'react';
import {TrophyOutlined} from '@ant-design/icons';

interface DoubleProps {
    totals: any;
    setting: any;
}

const Double: React.FC<DoubleProps> = ({totals, setting}) => {
    const isMultiplication = setting.mode === 'divide' || setting.mode === 'multiply';

    return <table>
        <thead>
        <tr>
            <th>#</th>
            <th>Результат</th>
            <th/>
            <th>Ответ ученика</th>
            <th>Правильный ответ</th>
            <th>Упражнение</th>
        </tr>
        </thead>
        <tbody>
        {totals.map((total: any, key: number) =>
            total &&
            [
                <tr key={key}>
                    <td rowSpan={2}>
                        {key + 1}
                    </td>
                    <td rowSpan={2}>
                        <TrophyOutlined
                            className={total[0].result && total[1].result ? 'warning' : 'secondary'}/>
                    </td>
                    <td className="position">Л</td>
                    <td className={`user ${total[0].result ? 'success' : 'danger'}`}>
                        {total[0].user !== undefined ? total[0].user : 'Пусто'}
                    </td>
                    <td className="answer">
                        {total[0].answer}
                    </td>
                    <td className="exercises">
                        {isMultiplication ?
                            total[0].exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + total[0].exercise[1] :
                            total[0].exercise.join(', ')
                        }
                    </td>
                </tr>,
                <tr key={key + '-two'}>
                    <td className="position">П</td>
                    <td className={`user ${total[1].result ? 'success' : 'danger'}`}>
                        {total[1].user !== undefined ? total[1].user : 'Пусто'}
                    </td>
                    <td className="answer">
                        {total[1].answer}
                    </td>
                    <td className="exercises">
                        {isMultiplication ?
                            total[1].exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + total[1].exercise[1] :
                            total[1].exercise.join(', ')
                        }
                    </td>
                </tr>
            ]
        )}
        </tbody>
    </table>;
};

export default Double;