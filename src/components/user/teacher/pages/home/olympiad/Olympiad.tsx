import React from 'react';
import styled from "styled-components";
import {Card} from "lib";
import {Legend} from "../../../../../../layouts/components";
import {Col, Row} from "antd";
import OlympiadCarousel from "./olympiad-carousel/OlympiadCarousel";
import OlympiadCreate from "./olympiad-create/OlympiadCreate";
import OlympiadBg from "assets/images/illustrations/home_olympiad.svg";

const OlympiadWrapper = styled(Card)`
  &.ant-card{
    background: ${props => props.theme.gradient_primary};
    position: relative;
    
    .ant-card-body{
      padding-bottom: 0;
     
      @media (max-width: 576px) {
        padding: 1rem 0;
      }
    }
    
    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url(${OlympiadBg}) no-repeat 106% 115%;
      background-size: 30%;
    
      @media (max-width: 576px) {
        background-position: 50% 95.5%;
        background-size: 90%;
      }
    }
  }
`;

const Olympiad: React.FC = () => {
    return <>
        <Legend>Мои текущие олимпиады</Legend>
        <OlympiadWrapper>
            <Row  gutter={15}>
                <Col xl={19} xs={24}>
                    <OlympiadCarousel/>
                </Col>
                <Col xl={5} xs={24}>
                    <OlympiadCreate/>
                </Col>
            </Row>
        </OlympiadWrapper>
    </>
};

export default Olympiad;