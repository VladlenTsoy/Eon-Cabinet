import React from 'react';
import {useSelector} from "react-redux";
import ResultMoreLayout from "../../../layouts/result/result-more/ResultMore.layout";
import {TrophyOutlined} from '@ant-design/icons';
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const ResultBlock: React.FC = () => {
    const {totals} = useSelector(gameSelector);

    return <ResultMoreLayout
        header={
            <tr>
                <td className="number">#</td>
                <td>Результат</td>
                <td>Правильный ответ</td>
                <td>Ваш ответ</td>
            </tr>
        }
        children={
            totals.map((total: any, key: number) =>
                <tr key={key}>
                    <td className="number">
                        {key + 1}
                    </td>
                    <td className={`trophy ${total.result ? 'warning' : 'second'}`}>
                        <TrophyOutlined/>
                    </td>
                    <td className="answer">
                        {total.exercise.word}
                    </td>
                    <td className={`user ${total.result ? 'success' : 'danger'}`}>
                        {total.user || 'Пусто'}
                    </td>
                </tr>
            )
        }
    />
};

export default ResultBlock;