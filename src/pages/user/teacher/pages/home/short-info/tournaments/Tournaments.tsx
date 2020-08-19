import React from 'react';
import {Card} from "lib/ui";
import ProcessSvg from "assets/images/tournaments/process.svg";
import styled from "styled-components";

const CardWrapper = styled(Card)`
  &.ant-card{
    @media (max-width: 576px) {
      display: none;
    }
  }
`;

const Wrapper = styled.div`
  text-align: center;
  
  img{
      width: 240px;
  }
  
  h4{
    font-weight: 600;
    font-size: 24px;
  }
`;

const Tournaments:React.FC = () => {
    return <CardWrapper>
        <Wrapper>
            <h4>Ведутся работы.</h4>
            <img src={ProcessSvg} alt="Ведутся работы"/>
        </Wrapper>
    </CardWrapper>;
};

export default Tournaments;