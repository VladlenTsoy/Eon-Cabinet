import React from 'react';
import {useSelector} from "react-redux";
import ResultMoreLayout from "../../../layouts/result/result-more/ResultMore.layout";
import {TrophyOutlined} from '@ant-design/icons';
import {gameSelector} from "../../../../../../../store/common/game/gameSplice";

const ResultBlock = () => {
    const {totals} = useSelector(gameSelector);

    return <ResultMoreLayout
        header={
            <tr>
                <td className="number">#</td>
                <td>Результат</td>
                <td>Правильный ответ</td>
                <td>Ваш ответ</td>
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
                        {!isNaN(total.user) ? total.user : 'Пусто'}
                    </td>
                </tr>
            )
        }
    </ResultMoreLayout>;
};

export default ResultBlock;