import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const WrapperLogo = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 0.5rem 1.5rem;
  height: 46px;
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 5;
  text-align: center;
  margin-bottom: 1rem;
`;

const LogoLinkWrapper = styled(Link)`
  display: block;
  transition: all 0.2s ease-in-out;
  height: 100%;
  width: 100%;
   
  .ant-menu-inline-collapsed &{
    width: 25px;
    overflow: hidden;
    margin: 0 auto;
  }

  img{
    height: 100%;
  }
`;

const Logo: React.FC<any> = ({logo}) =>
    <WrapperLogo>
        <LogoLinkWrapper to="/">
            <img src={logo} alt="Eon"/>
        </LogoLinkWrapper>
    </WrapperLogo>;

export default Logo
