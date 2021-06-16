import React from "react"
import {Legend} from "../../../../../lib"
import {LoadingBlock} from "lib"
import OlympiadEmpty from "./olympiad-empty/OlympiadEmpty"
import {useApiUserGeneral} from "../../../../../effects/use-api-user-general.effect"
import styled from "styled-components"
import CardOlympiad from "../../olympiad/list/current/card/CardOlympiad"
import {Carousel} from "antd"
import NextArrow from "../../../teacher/pages/home/olympiad/olympiad-carousel/next-arrow/NextArrow"
import {chunk} from "lodash"
import {useWindowSize} from "react-use"
import {useScreenWindow} from "../../../../../effects/use-screen-window.effect"

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
`

const Olympiad: React.FC = () => {
    const {width} = useWindowSize()
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})
    const [loading, olympiads, , fetch] = useApiUserGeneral({
        url: "student/olympiads/current",
        config: {params: {limit: 3}},
        initValue: []
    })

    if (loading)
        return <LoadingBlock/>

    if (!olympiads.length)
        return <OlympiadEmpty/>

    const size = width > 1200 ? 3 : width > 992 ? 2 : isBreakpoint ? 1 : 2

    return <>
        <Legend styled={{marginTop: 0}}>Олимпиады</Legend>
        <Carousel
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
        </Carousel>
    </>
}

export default Olympiad