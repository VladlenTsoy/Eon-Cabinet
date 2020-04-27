import React, {useEffect} from 'react';
import styled from "styled-components";
import ImageWin from "assets/images/illustrations/trophy.svg";


const TotalWinSound = require('assets/sounds/total_win.mp3');

const TrophyWrapper = styled.div`
    height: 350px;
    width: 350px;
    border-radius: 50%;
    //padding: 1rem;
    position: relative;
    margin: 0 auto;
    
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      animation: fadeInTrophy 1s 0.2s ease-in-out forwards;
      transform: scale(0);
    }
    
    ::before{
      border-radius: 50%;
      content: '';
      background: #bfbfbf1a;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      animation: fadeInTrophy 1s 1.2s ease-in-out forwards;
      transform: scale(0);
    }
    
    @keyframes fadeInTrophy{
      0% {
        transform: scale(0);
      }
      80%{
        transform: scale(1);
      }
      90%{
        transform: scale(0.8);
      }
      100% {
        transform: scale(1);
      }
    }
`;

const Trophy = () => {


    useEffect(() => {
        const audio = new Audio(TotalWinSound);
        audio.currentTime = 0;
        audio.play();
        return () => {
            audio.pause();
        }
    }, []);


    return <TrophyWrapper>
        <img src={ImageWin} alt="win"/>
    </TrophyWrapper>
};

export default Trophy;