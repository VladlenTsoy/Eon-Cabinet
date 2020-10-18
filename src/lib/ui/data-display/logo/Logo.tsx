import React from 'react';
import LogoSvg from "assets/images/logo_2.svg";
import styled from "styled-components";
import {Link} from "react-router-dom";

const LogoStyled: React.FC<any> = styled(Link)`
  background: ${props => props.theme.gradient_primary};
  box-shadow: ${props => props.theme.shadow_primary};
  border-radius: 50%;
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  display: block;

  .wrapper-img{
    position: absolute;
    left: 0.5rem;
    right: 0.5rem;
    top: 0.5rem;
    bottom: 0.5rem;  
  }
  
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

interface LogoProps {
    to?: string;
}

const Logo: React.FC<LogoProps> = ({to}) => {
    return <LogoStyled to={to}>
        <div className="wrapper-img">
            <img src={LogoSvg} alt="Logo"/>
        </div>
    </LogoStyled>;
};

export default Logo;