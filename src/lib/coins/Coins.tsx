import React from "react";
import image from "../../assets/images/icons/coin.svg";
import styled from "styled-components";

const CoinsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 0.25rem;
    
  span{
  }
  
  img{
    vertical-align: middle;
    width: 20px;
    margin-left: 0.25rem;
  }
`;

interface CoinsProps {
    count: number;
}

const Coins: React.FC<CoinsProps> = ({count}) => {
    return <CoinsWrapper>
        <span>{count}</span> <img src={image} alt="монеты"/>
    </CoinsWrapper>;
};

export default Coins;