import React from 'react';
import styled from "styled-components";
import StarSvg from "assets/images/star.svg";
import {StarWrapper} from "./Star.layout";

interface StarsStyleProps {
    delay: number;
}

const StarsWrapper: React.FC<StarsStyleProps> = styled.div<StarsStyleProps>`
  position: relative;
  transform: scale(1.5);
  animation: BackStars 1s ${props => props.delay}ms ease-in-out forwards;
  margin-bottom: 4rem;
  
  @media (max-width: 576px) {
    transform: scale(1.1);
  }
    
  width: 100%;
  display: grid;
  grid-template-columns: 31.5% 37% 31.5%;
  align-items: flex-end;
  
  @keyframes BackStars {
    100%{
      transform: scale(1);
    }
  }
`;

interface StarsProps {
    numberOfStars: number;
    delay: number;
}

const Stars: React.FC<StarsProps> = ({numberOfStars, delay}) => {
    return <StarsWrapper delay={delay}>
        <StarWrapper fadeInTime="1s 0.2s" position="left" rotate="-10deg"
                     shadowPunchTime="1s 0.9s" zoomTime="0.5s 6.4s">
            <img className="gray" src={StarSvg} alt="star"/>
            <img className={`main ${numberOfStars >= 1 && 'win'}`} src={StarSvg} alt="star"/>
        </StarWrapper>
        <StarWrapper fadeInTime="1s 1.2s" position="middle" rotate="0deg"
                     shadowPunchTime="1s 1.9s" zoomTime="0.5s 6.48s">
            <img className="gray" src={StarSvg} alt="star"/>
            <img className={`main ${numberOfStars >= 2 && 'win'}`} src={StarSvg} alt="star"/>
        </StarWrapper>
        <StarWrapper fadeInTime="1s 2.2s" position="right" rotate="10deg"
                     shadowPunchTime="1s 2.9s" zoomTime="0.5s 6.56s">
            <img className="gray" src={StarSvg} alt="star"/>
            <img className={`main ${numberOfStars >= 3 && 'win'}`} src={StarSvg} alt="star"/>
        </StarWrapper>
    </StarsWrapper>
};

export default Stars;