import React from 'react';
import styled from "styled-components";
import {Col, Row} from 'antd';
import bgAuthWrapper from "../../../assets/images/pages/login_page_bg.svg";
import Footer from "./Footer";
import Card from "./Card";

const AuthStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: url(${bgAuthWrapper}) no-repeat top,linear-gradient(-20deg,#2b5876,#4e4376);
  overflow-x: auto;
  align-items: center;
  padding-top: 1rem;
`;

const AuthScrollStyled = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  width: 100%;
`;

interface AuthLayoutProps {
    title: string;
    subTitle?: string;
    onFinish: (values: any) => void;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({title, subTitle, onFinish, children}) => {
    return <AuthStyled>
        <AuthScrollStyled>
            <Row justify="center" align="middle">
                <Col xxl={6} xl={8} lg={7} md={10} sm={12} xs={22}>
                    <Card title={title} subTitle={subTitle} onFinish={onFinish}>
                        {children}
                    </Card>
                </Col>
            </Row>
        </AuthScrollStyled>
        <Footer/>
    </AuthStyled>
};

export default AuthLayout;