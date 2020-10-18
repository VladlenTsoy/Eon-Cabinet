import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import styled from "styled-components";
import {NextArrowWrapper} from "lib/ui/data-display/carousel/next-arrow/NextArrow";

const NextArrowApplication = styled(NextArrowWrapper)`
  .ant-carousel &.slick-next{
    font-size: 70px;
    height: 100px;
    width: 100px;
    right: -90px;
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
      right: -48px;
    }
  }
`;

const NextArrow = () => {
    return (
      <NextArrowApplication>
          <div className="icon-wrapper">
              <ArrowRightOutlined />
          </div>
      </NextArrowApplication>
    );
};

export default NextArrow;