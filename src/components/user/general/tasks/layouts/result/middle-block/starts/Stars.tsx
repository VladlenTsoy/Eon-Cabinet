import React from 'react';
import styled from "styled-components";
import StarSvg from "assets/images/star.svg";
import {StarWrapper} from "./Star.layout";

const StarsWrapper = styled.div`
  position: relative;
  transform: scale(1.5);
  animation: BackStars 1s 3.2s ease-in-out forwards;
  margin-bottom: 3rem;
    
  width: 100%;
  display: grid;
  grid-template-columns: 31.5% 37% 31.5%;
  align-items: flex-end;
  
  @keyframes BackStars {
    100%{
      transform: scale(1);
    }
  }
  
  @keyframes scaleUpStar{
    0%{
      transform: scale(1.1);
    }
    50%{
      transform: scale(1.15);
    }
    100%{
      transform: scale(1.1);
    }
  }
  
  @keyframes shadowFadeOut {
    30%{
      filter: drop-shadow(0px 5px 3px #ff9800fc);
    }
    40%{
      filter: drop-shadow(0px 5px 150px #ff9800fc);
    }
    65%{
      filter: drop-shadow(0px 5px 150px #ff980000);
    }
    66%{
      filter: drop-shadow(0px 5px 3px #ff980000);
    }
    100%{
      filter: drop-shadow(0px 5px 3px #ff980050);
    }
  };

  @keyframes fadeInLeftStar{
    90%{
      transform: scale(1.15) rotate(-10deg);
    }
    100%{
      transform: scale(1.1) rotate(-10deg);
    }
  }

  @keyframes fadeInMiddleStar{
    90%{
      transform: scale(1.15);
    }
    100%{
      transform: scale(1.1);
    }
  }
  
  @keyframes fadeInRightStar{
    90%{
      transform: scale(1.15) rotate(10deg);
    }
    100%{
      transform: scale(1.1) rotate(10deg);
    }
  }
`;

const Stars = () => {
    return <StarsWrapper>
        <StarWrapper fadeInTime="1s 0.2s" position="left" rotate="-10deg"
                     shadowPunchTime="1s 0.9s" zoomTime="0.5s 6.4s">
            <img className="gray" src={StarSvg} alt="star"/>
            <img className="main" src={StarSvg} alt="star"/>
        </StarWrapper>
        <StarWrapper fadeInTime="1s 1.2s" position="middle" rotate="0deg"
                     shadowPunchTime="1s 1.9s" zoomTime="0.5s 6.48s">
            <img className="gray" src={StarSvg} alt="star"/>
            <img className="main" src={StarSvg} alt="star"/>
        </StarWrapper>
        <StarWrapper fadeInTime="1s 2.2s" position="right" rotate="10deg"
                     shadowPunchTime="1s 2.9s" zoomTime="0.5s 6.56s">
            <img className="gray" src={StarSvg} alt="star"/>
            <img className="main" src={StarSvg} alt="star"/>
        </StarWrapper>
    </StarsWrapper>
};

export default Stars;