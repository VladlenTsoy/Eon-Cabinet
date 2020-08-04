import React from 'react';
import styled from "styled-components";
import {PrevArrowWrapper} from "lib/components/carousel/prev-arrow/PrevArrow";
import { ArrowLeftOutlined } from '@ant-design/icons';

const PrevArrowApplication = styled(PrevArrowWrapper)`
  .ant-carousel &.slick-prev{
    font-size: 70px;
    height: 100px;
    width: 100px;
    left: -90px;
    top: calc(50% - 25px);
    
    @media (max-width: 1200px) {
    }
    
    @media (max-width: 992px) {
    }  
    
    @media (max-width: 768px) {
    }
    
    @media (max-width: 576px) {
      top: calc(50% - 12.5px);
      font-size: 35px;
      height: 50px;
      width: 50px;
      left: -48px;
    }
  }
`;

const PrevArrow = () => {
    return (
      <PrevArrowApplication>
          <div className="icon-wrapper">
              <ArrowLeftOutlined />
          </div>
      </PrevArrowApplication>
    );
};

export default PrevArrow;