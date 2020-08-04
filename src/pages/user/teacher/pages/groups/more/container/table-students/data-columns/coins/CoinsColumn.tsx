import React from 'react';
import styled from "styled-components";
import CoinIcon from "assets/images/icons/coin.svg";

const CoinsWrapper = styled.div`
  img {
    height: 20px;
    margin-left: 0.25rem;
    vertical-align: bottom;
  }
`;

interface CoinsColumnProps {
    coins: number;
}

const CoinsColumn:React.FC<CoinsColumnProps> = ({coins}) => {
    return <CoinsWrapper>{coins || 0}
        <img src={CoinIcon} alt="Монеты"/>
    </CoinsWrapper>;
};

export default CoinsColumn;