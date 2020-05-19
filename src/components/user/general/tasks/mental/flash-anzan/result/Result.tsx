import React from 'react';
import ResultMoreLayout from "../../../layouts/result/result-more/ResultMore.layout";
import {useSelector} from "react-redux";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {TrophyOutlined} from '@ant-design/icons';

const Result = () => {
    const totals: any = useSelector(totalsSelect);

    return <ResultMoreLayout
        header={
            <tr>
                <td className="number">#</td>
                <td>Результат</td>
                <td>Правильный ответ</td>
                <td>Ваш ответ</td>
                <td className="exercises">Задание</td>
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

export default Result;