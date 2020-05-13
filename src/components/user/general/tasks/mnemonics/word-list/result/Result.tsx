import React from 'react';
import {useSelector} from "react-redux";
import Card from "../../../layouts/result/homework/_new/details/card/Card";

interface ResultProps {

}

const ResultBlock: React.FC<ResultProps> = () => {
    const {totals} = useSelector((state: any) => state.game);

    return totals.map((exercise: any, key: any) =>
        <Card
            key={key}
            type="word"
            keyExercise={key + 1}
            result={exercise.result}
            user={exercise.user}
            answer={exercise.exercise.word}
        />
    );
};

export default ResultBlock;