import React from 'react';
import { RedoOutlined } from '@ant-design/icons';
import {Button, Carousel, Empty} from "antd";
import styled from "styled-components";
import {chunk} from "lodash";
import {LoadingBlock} from "lib";
import NextArrow from "lib/carousel/next-arrow/NextArrow";
import {useApiUserGeneral} from "../../../../../../hooks/use-api-user-general.effect";
import CardOlympiad from "./card/CardOlympiad";
import {DescriptionTitle} from "../../../../../../lib";
import {useAppContext} from "store/context/use-app-context";
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect";
import {useWindowSize} from "react-use";

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  padding: 1rem 0;
  
  @media (max-width: 1200px){
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 768px){
    grid-template-columns: 1fr;
  }
`;

interface CurrentOlympiadsProps {

}

const CurrentOlympiads: React.FC<CurrentOlympiadsProps> = () => {
    const {width} = useWindowSize();
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});
    const {language} = useAppContext();
    const [loading, olympiads, , fetch] = useApiUserGeneral({
        url: 'student/olympiads/current',
        initValue: [],
    });

    if (loading)
        return <LoadingBlock maxHeight="250px"/>;

    if (!olympiads.length)
        return (
            <Empty
                description={
                    <>
                        <DescriptionTitle>{language.common.empty}</DescriptionTitle>
                        <span>Нет текущих олимпиад.</span>
                    </>
                }
            >
                <Button type="ghost" size="large" onClick={fetch} icon={<RedoOutlined />}>
                    {language.student.refresh}
                </Button>
            </Empty>
        );

    const size = width > 1200 ? 3 : width > 992 ? 2 : isBreakpoint ? 1 : 2;

    return <Carousel
        dots={false}
        arrows={olympiads.length > size}
        nextArrow={NextArrow()}
        // prevArrow={PrevArrow()}
    >
        {
            chunk(olympiads, size).map((groupOlympiads: any, key) =>
                <div key={key}>
                    <CardsWrapper key={key}>
                        {groupOlympiads.map((olympiad: any, key: number) =>
                            <CardOlympiad key={key} olympiad={olympiad} fetch={fetch}/>
                        )}
                    </CardsWrapper>
                </div>
            )
        }
    </Carousel>;
};

export default CurrentOlympiads;