import React from 'react';
import styled from "styled-components";
import StarSvg from "assets/images/star.svg";

interface StarStyle {
    position: string;
    fadeInTime: string;
    shadowPunchTime: string;
    zoomTime: string;
    rotate: string;

}

const StarWrapper: React.FC<StarStyle> = styled.div<StarStyle>`
  position: relative;
  z-index: ${props => props.position === 'middle' ? 2 : 1};
  right: ${props => props.position === 'left' ? '-10px' : 'auto'};
  left: ${props => props.position === 'right' ? '-10px' : 'auto'};

  .gray{
    filter: grayscale(1);
    transform: scale(1.1) rotate(${props => props.rotate});
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
  .main{
    transform: scale(0) rotate(${props => props.rotate});
    width: 100%;
    animation: fadeIn${props => props.position}Star ${props => props.fadeInTime} ease-in-out forwards,
     shadowPunch${props => props.position}Star ${props => props.shadowPunchTime} ease-in-out forwards,
      zoom${props => props.position}Star ${props => props.zoomTime} ease-in-out forwards;
  }   
  
  @keyframes zoom${props => props.position}Star{
    0%{
      transform: scale(1.1) rotate(${props => props.rotate});
    }
    50%{
      transform: scale(1.15) rotate(${props => props.rotate});
    }
    100%{
      transform: scale(1.1) rotate(${props => props.rotate});
    }
  }
  
  @keyframes shadowPunch${props => props.position}Star {
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

  @keyframes fadeIn${props => props.position}Star{
    90%{
      transform: scale(1.15) rotate(${props => props.rotate});
    }
    100%{
      transform: scale(1.1) rotate(${props => props.rotate});
    }
  }
`;

const Star = () => {
    return <>
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
    </>
};

export default Star;