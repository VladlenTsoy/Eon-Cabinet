import React from 'react';
import {useSelector} from "react-redux";
import BasicResult from "./basic-result/Basic";
import DoubleResult from "./double-result/Double";

const ResultBlock: React.FC = () => {
    const {setting, totals} = useSelector((state: any) => state.game);
    const isMultiplication = setting.mode === 'divide' || setting.mode === 'multiply';

    return totals.map((total: any, key: number) =>
        setting.anzan === 'double' ?
            <DoubleResult total={total} setting={setting} isMultiplication={isMultiplication} key={key} keyExercise={key}/> :
            <BasicResult total={total} setting={setting} isMultiplication={isMultiplication} key={key} keyExercise={key}/>);

};

export default ResultBlock;