import React from 'react';
import CardListLayout from "../../../../layouts/application/list/card-list/CardList.layout";

interface ListTableProps {
    timeIsRunningOut: () => void;
}

const ListApplication: React.FC<ListTableProps> = (
    {
        timeIsRunningOut,
    }
) => {
    const checkResult = (total: any, answer: string): boolean =>
        String(total.exercise.word)
            .replace(/ё/g,"е")
            .toLowerCase() === String(answer)
            .replace(/ё/g,"е")
            .toLowerCase();

    const outputExercise = (total: any) =>
        total.exercise.word;

    return <CardListLayout
            column={5}
            timeIsRunningOut={timeIsRunningOut}
            checkResult={checkResult}
            outputExercise={outputExercise}
        />;
};

export default ListApplication;