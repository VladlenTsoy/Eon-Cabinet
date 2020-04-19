import React from 'react';
import decorLeft from "../../../../../../../../assets/images/illustrations/decore-left.png";
import decorRight from "../../../../../../../../assets/images/illustrations/decore-right.png";
import styled from "styled-components";

const DecorLeftWrapper = styled.img`
  position: absolute;
  left: -115px; 
  top: -115px; 
  animation: left 1s ease-in-out forwards;
  animation-delay: 1s;
 
  @media (max-width: 576px) {
    width: 150px;
  }
  
  @keyframes left{
    from {
      left: -115px;
      top: -115px;
    }
    to {
      left: 0; 
      top: 0; 
    }
  }
`;

const DecorRightWrapper = styled.img`
  position: absolute;
  top: -115px; 
  right: -115px; 
  animation: right 1s ease-in-out forwards;
  animation-delay: 1s;

  @media (max-width: 576px) {
    width: 150px;
  }

  @keyframes right{
    from {
      right: -115px; 
      top: -115px; 
    }
    to {
      right: 0; 
      top: 0; 
    }
  }
`;

interface BgConfettiIntermediateProps {
    result: boolean;
}

const BgConfettiIntermediate: React.FC<BgConfettiIntermediateProps> = ({result}) => {
    return <>
        {result ? <DecorLeftWrapper src={decorLeft} alt="decor-left"/> : null}
        {result ? <DecorRightWrapper src={decorRight} alt="decor-right"/> : null}
    </>;
};

export default BgConfettiIntermediate;