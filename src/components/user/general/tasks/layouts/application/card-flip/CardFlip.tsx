import React, {useState} from 'react';
import styled from "styled-components";

const CardFlipWrapper: any = styled.div<any>`
  height: 420px;
  width: ${(props: any) => props.isMasterSystem ? '632px' : '280px'};
  margin: 0 auto;
  position: relative;
  transform-style: preserve-3d;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    width: ${(props: any) => props.isMasterSystem ? '430px' : '280px'};
  }
  
  @media (max-width: 576px) {
    height: 270px;
    width: 215px;
  }
  
  &.flipped {
    .front {
      transform: rotateY(180deg);
    }
    .back {
      transform: rotateY(0deg);
    }
  }
                
  .front, .back{
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: absolute;
    border-radius: 10px;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: -webkit-transform ease 500ms;
    transition: transform ease 500ms;
    user-select: none;
    cursor: pointer;

    background: steelblue;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .text-fit {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 600px;
      color: #ffffff;
      font-size: 180px;
      font-weight: 600;
      
      @media (max-width: 768px) {
        width: 400px;
        font-size: 150px;
      }
      
      @media (max-width: 576px) {
        font-size: 100px;
        width: 200px;
      }
    }
  }
  
  .front{
    z-index: 2;
    transform: rotateY(0deg);
  }
  .back{
    transform: rotateY(-180deg);

    img{
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
`;

interface CardFlipProps {
    isMasterSystem?: boolean;
    front: any;
    back: any;
}

const CardFlip: React.FC<CardFlipProps> = ({front, back, isMasterSystem}) => {
    const [flipped, setFlipped] = useState(false);

    const clickHandler = () => setFlipped(!flipped);

    return <CardFlipWrapper
        isMasterSystem={isMasterSystem}
        className={flipped ? 'flipped' : ''}
        onClick={clickHandler}
    >
        <div className="front">
            {front}
        </div>
        <div className="back">
            {back}
        </div>
    </CardFlipWrapper>;
};

export default CardFlip;