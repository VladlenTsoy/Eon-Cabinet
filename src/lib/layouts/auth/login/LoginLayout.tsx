import React from "react"
import styled from "styled-components"
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

const ColumnStyled = styled.div`
  max-width: 420px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
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
                    <ColumnStyled>
                        <Card
                            title={title}
                            subTitle={subTitle}
                            onFinish={onFinish}
                        >
                            {children}
                        </Card>
                    </ColumnStyled>
            </LoginScrollStyled>
            <Footer />
        </LoginStyled>
    )
}

export default LoginLayout