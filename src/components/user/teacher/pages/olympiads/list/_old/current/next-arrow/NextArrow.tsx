import React from 'react';
import styled from "styled-components";
import { ArrowRightOutlined } from '@ant-design/icons';

export const NextArrowWrapper = styled.div`
  .ant-carousel &.slick-next{
     background: #ffffff;
     box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
     font-size: 30px;
     border-radius: 50%;
     height: 50px;
     width: 50px;
     right: -7.5px;
     z-index: 1;

     &:hover{
      background: #ffffff;
      color: ${props => props.theme.color_primary};    
     }
         
     &:before{
      content: none;
     }
         
     .icon-wrapper{
         display: flex;
         align-items: center;
         justify-content: center;
         height: 100%;
         width: 100%;
         color: ${props => props.theme.color_main};
     }
  }
`;

const NextArrow = () => {
    return (
        <NextArrowWrapper>
            <div className="icon-wrapper">
                <ArrowRightOutlined />
            </div>
        </NextArrowWrapper>
    );
};

export default NextArrow;