import React from 'react';
import styled from "styled-components";
import StepSuccessSVG from "assets/images/olympiad/step_success.svg";

interface ImageStyleProps {
    percent: number;
}

const ImageWrapper: React.FC<ImageStyleProps> = styled.div<ImageStyleProps>`
  width: 60px;
  height: 60px;
  //margin: 0 auto;
  position: relative;
  overflow: hidden;
  
  .filter{
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: ${props => props.percent}%;
    z-index: 4;
    filter: grayscale(1);
    overflow: hidden;
    
    img{
      width: 100%;
    }
  }  
  
  img{
    width: 100%;
    position: relative;
    z-index: 3;
  }
  
  .disabled & {
    opacity: 0.5;
  }
`;

interface TabImageProps {
    percent: number;
}

const TabImage: React.FC<TabImageProps> = ({percent}) => {
    return <ImageWrapper percent={percent}>
        <img src={StepSuccessSVG} alt=""/>
        <div className="filter">
            <img src={StepSuccessSVG} alt=""/>
        </div>
    </ImageWrapper>
};

export default TabImage;