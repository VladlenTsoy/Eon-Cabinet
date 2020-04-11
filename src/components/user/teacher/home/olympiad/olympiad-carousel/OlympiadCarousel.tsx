import React from 'react';
import styled from "styled-components";
import {Carousel} from "antd";
import {chunk} from "lodash";
import CardOlympiad from "../../../olympiads/list/current/card/CardOlympiad";
import NextArrow from "./next-arrow/NextArrow";
import PrevArrow from "./prev-arrow/PrevArrow";
import {useApiUserGeneral} from "../../../../../../effects/use-api-user-general.effect";
import OlympiadEmpty from "./olympiad-empty/OlympiadEmpty";
import {LoadingBlock} from "lib";
import {useScreenWindow} from "../../../../../../effects/use-screen-window.effect";

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    grid-template-columns: 1fr;
  }
`;

const OlympiadCarousel: React.FC = () => {
    const [loading, olympiads, , fetch] = useApiUserGeneral({url: 'teacher/olympiads/current', initValue: []});
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    // Обновление после остановки таймера
    const callback = () => fetch;

    if (loading)
        return <LoadingBlock/>;

    if (!olympiads.length)
        return <OlympiadEmpty/>;

    return <Carousel
        arrows={olympiads.length >= 2}
        nextArrow={NextArrow()}
        prevArrow={PrevArrow()}
    >
        {chunk(olympiads, isBreakpoint ? 1 : 2).map((olympiad: any, key: any) =>
            <div key={key}>
                <CardsWrapper>
                    <CardOlympiad olympiad={olympiad[0]} callback={callback} key={`${key}0`}/>
                    {olympiad[1] ?
                        <CardOlympiad olympiad={olympiad[1]} callback={callback} key={`${key}1`}/> :
                        null}
                </CardsWrapper>
            </div>
        )}
    </Carousel>;
};

export default OlympiadCarousel;