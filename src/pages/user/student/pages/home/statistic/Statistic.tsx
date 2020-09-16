import React from 'react';
import Profile from "./profile/Profile";
import Homework from "./homework/Homework";
import styled from "styled-components";
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect";
import {Carousel} from "antd";
import {useApiUserGeneral} from "hooks/use-api-user-general.effect";
import NextArrow from "lib/ui/carousel/next-arrow/NextArrow";
import Olympiad from "./olympiad/Olympiad";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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
    const [loading, statistic] = useApiUserGeneral({url: '/student/statistic'});

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
            <Homework key="homework" loading={loading} homework={statistic?.homework}/>,
            <Olympiad key="olympiad" loading={loading} olympiad={statistic?.olympiad}/>
        ]
    );
};

export default Statistic;