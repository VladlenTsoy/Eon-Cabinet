import React from "react"
import Header from "./header/Header"
import styled from "styled-components"
import Footer from "./footer/Footer"
import Container from "./container/Container"

const RegistrationStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

interface RegistrationProps {
    handleSubmit: (params: any) => void
}

const RegistrationLayout: React.FC<RegistrationProps> = ({
    handleSubmit,
    children
}) => {
    return (
        <RegistrationStyled>
            <Header />
            <Container handleSubmit={handleSubmit}>{children}</Container>
            <Footer />
        </RegistrationStyled>
    )
}

export default RegistrationLayout
