import React, {useEffect} from 'react';
import styled from "styled-components";
import Star from "./star/Star";

const TotalWinSound = require('assets/sounds/total_win.mp3');

const StarsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 31.5% 37% 31.5%;
  align-items: flex-end;
  
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

    useEffect(() => {
        const audio = new Audio(TotalWinSound);
        audio.currentTime = 0;
        audio.play();
        return () => {
            audio.pause();
        }
    }, []);

    return <StarsWrapper>
      <Star/>
    </StarsWrapper>;
};

export default Stars;