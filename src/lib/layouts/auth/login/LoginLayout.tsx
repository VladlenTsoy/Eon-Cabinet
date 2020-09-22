import React from "react"
import styled from "styled-components"
import {Col, Row} from "antd"
import bgLoginWrapper from "../../../../assets/images/pages/login_page_bg.svg"
import Footer from "./Footer"
import Card from "./Card"
import HeaderLanguage from "./HeaderLanguage"

const LoginStyled = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: url(${bgLoginWrapper}) no-repeat top,
        linear-gradient(-20deg, #2b5876, #4e4376);
    overflow-x: auto;
    align-items: center;
    padding-top: 1rem;
`

const LoginScrollStyled = styled.div`
    margin-top: auto;
    margin-bottom: auto;
    width: 100%;
`

interface LoginLayoutProps {
    title: string
    subTitle?: string
    onFinish: (values: any) => void
}

const LoginLayout: React.FC<LoginLayoutProps> = ({
    title,
    subTitle,
    onFinish,
    children
}) => {
    return (
        <LoginStyled>
            <HeaderLanguage />
            <LoginScrollStyled>
                <Row justify="center" align="middle">
                    <Col xxl={6} xl={8} lg={7} md={10} sm={16} xs={22}>
                        <Card
                            title={title}
                            subTitle={subTitle}
                            onFinish={onFinish}
                        >
                            {children}
                        </Card>
                    </Col>
                </Row>
            </LoginScrollStyled>
            <Footer />
        </LoginStyled>
    )
}

export default LoginLayout