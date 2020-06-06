import React, {useState} from 'react';
import {LoadingBlock} from "lib";
import {Empty, Carousel, Typography} from "antd";
import CardOlympiad from "./card/CardOlympiad";
import {chunk} from "lodash";
import styled from "styled-components";
import {useApiUserGeneral} from "../../../../../../../effects/use-api-user-general.effect";
import PrevArrow from "./prev-arrow/PrevArrow";
import NextArrow from "./next-arrow/NextArrow";
import {DescriptionTitle} from "../../../../../../../lib";
import {useAppContext} from "store/context/use-app-context";
import {useScreenWindow} from "../../../../../../../effects/use-screen-window.effect";

const {Title} = Typography;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CurrentOlympiads: React.FC = () => {
    const [, breakpoint] = useScreenWindow({breakpoint: 'sm'});

    const {language} = useAppContext();
    const [update, setUpdate] = useState(false);
    const [loader, olympiads] = useApiUserGeneral({url: 'teacher/olympiads/current', initValue: []});

    // Обновление после остановки таймера
    const callback = () => setUpdate(!update);

    if (loader)
        return <LoadingBlock/>;

    if (!olympiads.length)
        return <Empty
            description={
                <>
                    <DescriptionTitle>{language.common.empty}</DescriptionTitle>
                    <span style={{display: 'inline-block', marginBottom: '1.5rem'}}>
                        Нет текущих олимпиад.
                    </span>
                </>
            }
        />;

    return <>
        <Title level={4}>Текущие олимпиады</Title>
        <Carousel
            arrows={olympiads.length >= 2}
            nextArrow={NextArrow()}
            prevArrow={PrevArrow()}
        >
            {chunk(olympiads, breakpoint ? 1 : 2).map((olympiad: any, key: any) =>
                <div key={key}>
                    <CardsWrapper>
                        <CardOlympiad olympiad={olympiad[0]} callback={callback} key={`${key}0`}/>
                        {olympiad[1] ?
                            <CardOlympiad olympiad={olympiad[1]} callback={callback} key={`${key}1`}/> :
                            null}
                    </CardsWrapper>
                </div>
            )}
        </Carousel>
    </>;
};

export default CurrentOlympiads;