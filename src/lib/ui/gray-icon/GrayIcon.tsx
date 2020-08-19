import React from 'react';
import styled from "styled-components";


interface StyledProps extends React.HTMLAttributes<HTMLDivElement> {
    percent: number;
    width: string;
    shadowBottom: number;
}


const GrayIconWrapper: React.FC<StyledProps> = styled.div<StyledProps>`
  width: ${props => props.width};
  height: ${props => props.width};
  position: relative;

  > img{
    width: 100%;
    filter: drop-shadow(0px ${props => props.shadowBottom}px 5px #ff983878);
  }
  
  .filter{
    filter: grayscale(1);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: ${props => props.percent || 0}%;
    overflow: hidden;
    animation: filterBottom 2s ease-in-out;

    > img{
      transform: scale(1.01);
      width: 100%;
    }
    
    @keyframes filterBottom{
      0%{
        bottom: 0;
      }         
    }
  }
`;

interface GrayIconProps {
    img: string;
    alt: string;
    percent: number;
    width: string;
}

const GrayIcon: React.FC<GrayIconProps> = (
    {
        percent,
        width,
        img,
        alt
    }
) => {
    return <GrayIconWrapper shadowBottom={5} percent={percent} width={width}>
        <img src={img} alt={alt}/>
        <div className="filter">
            <img src={img} alt={alt}/>
        </div>
    </GrayIconWrapper>;
};

export default React.memo(GrayIcon);