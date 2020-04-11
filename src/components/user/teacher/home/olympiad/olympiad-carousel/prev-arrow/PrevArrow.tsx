import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styled from "styled-components";

export const PrevArrowWrapper = styled.div`
  .ant-carousel &.slick-prev{
     background: ${props => props.theme.bg_color_arrow};
     box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
     font-size: 30px;
     border-radius: 50%;
     height: 50px;
     width: 50px;
     left: -7.5px;
     z-index: 1;
     top: calc(50% - 25px);
    
     @media (max-width: 576px) {
       left: 2.5px;
     }         
    
     &:hover{
      background: ${props => props.theme.bg_color_arrow};
      
      i{
        color: ${props => props.theme.color_primary};    
      }     
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

const PrevArrow = () =>
    <PrevArrowWrapper>
        <div className="icon-wrapper">
            <ArrowLeftOutlined />
        </div>
    </PrevArrowWrapper>;

export default PrevArrow;