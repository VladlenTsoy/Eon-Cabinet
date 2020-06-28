import React from 'react';
import Profile from "./profile/Profile";
import Homework from "./homework/Homework";
import styled from "styled-components";
import {useScreenWindow} from "../../../../../hooks/use-screen-window.effect";
import {Carousel} from "antd";
import NextArrow from "lib/carousel/next-arrow/NextArrow";
import Olympiad from "./olympiad/Olympiad";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0 15px;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 768px) {
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

const Statistic: React.FC = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const wrapper = (child: any) => {
        if (isBreakpoint)
            return <Carousel
                nextArrow={NextArrow()}
                arrows
            >
                {child}
        </Carousel>;

        return <Wrapper>{child}</Wrapper>
    };

    return wrapper(
        [
            <Profile key="profile"/>,
            <Olympiad key="olympiad"/>,
            <Homework key="homework"/>
        ]
    );
};

export default Statistic;