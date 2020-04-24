import React from 'react';
import {withRouter} from 'react-router-dom';
import CarouselApplication from "../../../../layouts/application/carousel-application/CarouselApplication";
import PreparationLayout from "../../../../layouts/application/preparation/Preparation.layout";
import {useSelector} from "react-redux";
import CardFlip from "../../../../layouts/application/_old/card-flip/CardFlip";

interface BasicApplicationProps {
    history: any;
}

const BasicApplication: React.FC<BasicApplicationProps> = ({history}) => {
    const {game} = useSelector((state: any) => state);
    const {totals} = game;

    const afterFinishing = () => {
        history.goBack();
    };

    return <PreparationLayout>
        <CarouselApplication afterFinishing={afterFinishing}>
            {totals.map((total: any, key: number) =>
                <div key={key}>
                    <CardFlip
                        front={
                            <div className="text-fit">
                                {total.exercise.number < 10 ? `0${total.exercise.number}` : total.exercise.number}
                            </div>
                        }
                        back={
                            <img src={total.exercise.url_form} alt={total.exercise.number}/>
                        }
                    />
                </div>
            )}
        </CarouselApplication>
    </PreparationLayout>;
};

export default withRouter(BasicApplication);