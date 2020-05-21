import React from 'react';
import styled from "styled-components";

interface StyledProps {
    rayColor: string;
    delay: number;
}

const Wrapper: React.FC<StyledProps> = styled.div<StyledProps>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  overflow: hidden;
  bottom: 0;
  background: ${props => props.theme['@component-background']};

  .container{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    overflow: hidden;
    bottom: 0;
    transform: scale(0);
    animation: scaleBackground .5s ${props => props.delay}ms forwards;
  }
  
  @keyframes scaleBackground{
    100%{
      transform: scale(1);    
    }
  }

  @media (max-width: 992px) {
    bottom: auto;
    height: calc(100vh - 46px);
    
    ::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      background: linear-gradient(0deg, ${props => props.theme['@layout-body-background']} 40%, transparent 100%);
      bottom: -25px;
      height: 100px;
    }
  }

  ul {
    position: absolute;
    left: -1em;
    right: -1em;
    top: -1em;
    bottom: -1em;
    margin: auto;
    padding: 0;
    width: 0;
    height: 0;
    list-style: none;
    animation: 70s rotate infinite linear;    
    z-index: 0;
  }
  li,
  li:before,
  li:after {
    position: absolute;
    border: 0 solid transparent;
    border-width: 1.2em 20em;
    border-color: transparent ${props => props.rayColor};
    width: 0;
    height: 0;
    font-size: 40px;
  }
  li {
    left: -20em;
    top: 50%;
    margin-top: -1.2em;
    transform: rotate(.1deg);
  }
  li:before,
  li:after {
    left: -20em;
    top: -1.2em;
    display: block;
    content: "";
  }

  li:before {
    transform: rotate(60deg);
  }
  li:after {
    transform: rotate(-60deg);
  }

  li:nth-child(2){
    transform: rotate(15deg);
  }
  li:nth-child(2),
  li:nth-child(2):before,
  li:nth-child(2):after {
    border-color: transparent ${props => props.rayColor};
  }
  li:nth-child(3){
    transform: rotate(30deg);
  }
  li:nth-child(3),
  li:nth-child(3):before,
  li:nth-child(3):after {
    border-color: transparent ${props => props.rayColor};
  }
  li:nth-child(4){
    transform: rotate(45deg);
  }
  li:nth-child(4),
  li:nth-child(4):before,
  li:nth-child(4):after {
    border-color: transparent ${props => props.rayColor};
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface BgRaysProps {
    loading?: boolean;
    color?: string;
    delay?: number;
}

const BgRays: React.FC<BgRaysProps> = ({loading = false, color, delay= 7500}) => {
    return <Wrapper rayColor={color || 'rgba(0,0,0,0.02)'} delay={delay}>
        {
            loading ? null :
                <div className="container">
                    <ul>
                        <li/>
                        <li/>
                        <li/>
                        <li/>
                    </ul>
                </div>
        }
    </Wrapper>;
};

export default React.memo(BgRays);