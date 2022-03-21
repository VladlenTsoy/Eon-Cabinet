import React from 'react';
import {useSelector} from "react-redux";
import {TrophyOutlined} from '@ant-design/icons';
import {useAddSpaceToString} from "../../../../../../../hooks/use-add-space-to-string";
import ResultMoreLayout from "../../../layouts/result/result-more/ResultMore.layout";
import {gameSelector} from "store/game/gameSplice";

const ResultBlock = () => {
    const {totals} = useSelector(gameSelector);
    const addSpaceToString = useAddSpaceToString();

    return <ResultMoreLayout
        header={
            <tr>
                <td className="number">#</td>
                <td>Результат</td>
                <td className="exercises">Задание</td>
            </tr>
        }>
        {totals.map((total: any, key: number) =>
            [
                <tr key={key}>
                    <td className="number" rowSpan={2}>
                        {key + 1}
                    </td>
                    <td className={`trophy ${total.result ? 'warning' : 'second'}`} rowSpan={2}>
                        <TrophyOutlined/>
                    </td>
                    <td className="exercises">{addSpaceToString(total.answer)}</td>
                </tr>,
                <tr key={key + '-two'}>
                    <td className="exercises">{addSpaceToString(total.user) || 'Пусто'}</td>
                </tr>
            ]
        )}
    </ResultMoreLayout>
};

export default ResultBlock;
