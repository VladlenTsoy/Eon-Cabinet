import React from 'react';
import styled from "styled-components";
import {Modal} from "antd";

const AwardWrapper = styled.div<any>`
  width: 75px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  .filter{
    overflow: hidden;
    filter: brightness(7) contrast(0.9) grayscale(1);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: ${(props: any) => props.stage}%;
    transition: all 0.3s ease-in-out;
    transform: scale(1.1);
    
    :hover{
      opacity: 0.7;
    }
  }
  
  img{
    width: 100%;
    pointer-events: none;
    user-select: none;
  }
  
  :hover{
    > img {
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1))
    }
  }
`;

const IconWrapper = styled.div`
  width: 100px;
  float: left;
  margin-right: 16px;
  margin-left: -16px;
  
  img {
    animation-delay: 0.3s;
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-name: swing;
    width: 100%;
  }
`;

interface AwardLayoutProps {
    title: string;
    content: any;
    icon: any;
    stage?: number;
}


const AwardLayout: React.FC<AwardLayoutProps> = (
    {
        title,
        content,
        icon,
        stage = 0
    }
) => {
    const open = () => {
        Modal.info({
            title: title,
            content: content,
            icon: <IconWrapper>
                <img src={icon} alt={title}/>
            </IconWrapper>
        })
    };

    return <AwardWrapper stage={stage} onClick={open}>
        <img src={icon} alt={title}/>
        <div className="filter">
            <img src={icon} alt={title}/>
        </div>
    </AwardWrapper>;
};

export default AwardLayout;