import React from 'react';
import PreparationLayout from "../../../../layouts/application/preparation/Preparation.layout";
import CarouselApplication from "../../../../layouts/application/carousel-application/CarouselApplication";

interface BasicApplicationProps {
    timeIsRunningOut: () => void;
}

const BasicApplication: React.FC<BasicApplicationProps> = (
    {
        timeIsRunningOut,
    }
) => {
    const outputExercise = (total: any) =>
        total.exercise.word;

    return <PreparationLayout>
        <CarouselApplication
            topNumber
            timeIsRunningOut={timeIsRunningOut}
            outputExercise={outputExercise}
        />
    </PreparationLayout>;
};

export default BasicApplication;