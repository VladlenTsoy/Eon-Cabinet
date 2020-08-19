import React from "react";
import {Legend} from "../../../../../lib/ui";
import {LoadingBlock} from "lib/ui";
import HomeworkBlock from "../../layouts/homework-block/HomeworkBlock";
import {useApiUserGeneral} from "../../../../../hooks/use-api-user-general.effect";
import HomeworkEmpty from "./homework-empty/HomeworkEmpty";
import HomeworkMoreLink from "./homework-more/HomeworkMoreLink";
import HomeworkWait from "./homework-wait/HomeworkWait";
import styled from "styled-components";
import {useWindowSize} from "react-use";
import {useScreenWindow} from "../../../../../hooks/use-screen-window.effect";
import {Carousel} from "antd";
import NextArrow from "lib/ui/carousel/next-arrow/NextArrow";

const HomeworkWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0 15px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 768px) {
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const BlockWrapper=styled.div`
  @media (max-width: 576px) {
    padding-right: 1rem;  
  }
`;

const Homework: React.FC = () => {
    const {width} = useWindowSize();
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});
    const [loading, homework, , fetch] = useApiUserGeneral({
        url: 'student/homework/all',
        initValue: [],
        config: {params: {limit: 3}}
    });
    const lengths = Array(width > 1200 ? 3 : width > 992 ? 2 : isBreakpoint ? 3 : 1).fill(true);

    if (loading)
        return <LoadingBlock maxHeight="300px"/>;

    if (!homework.length)
        return <HomeworkEmpty fetch={fetch}/>;

    const wrapper = (child: any) => {
        if (isBreakpoint)
            return <Carousel
                arrows
                nextArrow={NextArrow()}
            >
                {child}
            </Carousel>;

        return <HomeworkWrapper>{child}</HomeworkWrapper>
    };

    return <>
        <Legend style={{marginTop: 0}}>Домашние задания</Legend>
        {wrapper(
            [
                lengths.map((val: any, key: number) =>
                    homework[key] ?
                        <BlockWrapper key={key}>
                            <HomeworkBlock homework={homework[key]}/>
                        </BlockWrapper>:
                        isBreakpoint ? null : <HomeworkWait key={key}/>
                ),
                <HomeworkMoreLink key="more"/>
            ]
        )}
    </>;
};

export default Homework;