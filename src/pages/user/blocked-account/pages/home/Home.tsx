import React from 'react';
import BlockedSvg from 'assets/images/pages/blocked-account/blocked.svg';
import {Card} from "../../../../../lib/components";
import styled from "styled-components";
import {Typography} from "antd";

const {Title} = Typography;

const InformationStyled = styled.div`
  text-align: center;
  img{
    max-width: 600px;
    width: 100%;
  }
`;

const Home = () => {
    return <Card>
        <InformationStyled>
            <Title level={1}>Ваш аккаунт заблокирован!</Title>
            <img src={BlockedSvg} alt="blocked"/>
        </InformationStyled>
    </Card>;
};

export default Home;