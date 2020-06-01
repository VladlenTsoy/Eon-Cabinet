import React from 'react';
import {useSelector} from "react-redux";
import BasicResult from "./basic-result/Basic";
import DoubleResult from "./double-result/Double";
import ResultMoreLayout from "../../../layouts/result/result-more/ResultMore.layout";
import {gameSelector} from "../../../../../../../store/reducers/common/game/gameSplice";

const ResultBlock: React.FC = () => {
    const {totals, setting}= useSelector(gameSelector);
    const isMultiplication = setting.mode === 'divide' || setting.mode === 'multiply';
    const isDouble = setting.anzan === 'double';

    return <ResultMoreLayout
        header={
            <tr>
                <td className="number">#</td>
                <td>Результат</td>
                {isDouble && <td/>}
                <td>Правильный ответ</td>
                <td>Ваш ответ</td>
                <td className="exercises">Задание</td>
            </tr>
        }
        children={
            totals.map((total: any, key: number) =>
                setting.anzan === 'double' ?
                    <DoubleResult total={total} setting={setting} isMultiplication={isMultiplication} key={key}
                                  keyExercise={key}/> :
                    <BasicResult total={total} setting={setting} isMultiplication={isMultiplication} key={key}
                                 keyExercise={key}/>)
        }
    />
};

export default ResultBlock;