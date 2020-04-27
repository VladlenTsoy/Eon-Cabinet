import React from 'react';
import {useSelector} from "react-redux";
import Card from "../../../layouts/result/_new/details/card/Card";

const ResultBlock = () => {
    const {totals} = useSelector((state: any) => state.game);

    return totals.map((exercise: any, key: any) =>
        <Card
            key={key}
            type="word"
            keyExercise={key + 1}
            result={exercise.result}
            user={exercise.user}
            answer={exercise.exercise}
        />
    );
};

export default ResultBlock;