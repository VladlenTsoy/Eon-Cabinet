import React from 'react';
import {useSelector} from "react-redux";
import PreparationLayout from "../../../../layouts/application/preparation/Preparation.layout";
import CarouselApplication from "../../../../layouts/application/carousel-application/CarouselApplication";
import CardFlip from "../../../../layouts/application/card-flip/CardFlip";
import TextFit from "../../../../../../teacher/training/tasks/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";

const BasicApplication = () => {
    const {game} = useSelector((state: any) => state);
    const {totals} = game;

    return <PreparationLayout>
        <CarouselApplication>
            {totals.map((total: any, key: number) =>
                <div key={key}>
                    <CardFlip
                        isMasterSystem
                        front={
                            <div className="text-fit">
                                {total.exercise.number < 10 ? `0${total.exercise.number}` : total.exercise.number}
                            </div>
                        }
                        back={
                            <TextFit isLoading>
                                <div className="text-fit">
                                    {total.exercise.word}
                                </div>
                            </TextFit>
                        }
                    />
                </div>
            )}
        </CarouselApplication>
    </PreparationLayout>;
};

export default BasicApplication;