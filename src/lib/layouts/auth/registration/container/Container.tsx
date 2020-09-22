import React from "react"
import {Form} from "antd"
import styled from "styled-components"
import bg from "../../../../../assets/images/security_SVG.svg"
import {useLanguage} from "../../../../../hooks/use-language"
import {useScreenWindow} from "../../../../../hooks/use-screen-window.effect"

const ContainerStyled = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 3rem 1rem;

    @media (max-width: 768px) {
        height: auto;
    }
`
const BGContainerStyled = styled.div`
    width: 100%;
    height: 100%;
    background: url(${bg}) no-repeat center;
    background-size: 65%;
`

const FormContainerStyled = styled.div`
    max-width: 350px;
    width: 100%;
    margin-left: 1rem;

    @media (max-width: 768px) {
        margin: 0 auto;
    }
`

export const TitleStyled = styled.h1`
    font-weight: bolder;
    text-align: left;
`

export const SubTitleStyled = styled.p`
    margin-bottom: 2rem;
`

interface ContainerProps {
    handleSubmit: (params: any) => void
}

const Container: React.FC<ContainerProps> = ({children, handleSubmit}) => {
    const {l} = useLanguage()
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})

    return (
        <ContainerStyled>
            {!isBreakpoint && <BGContainerStyled />}
            <FormContainerStyled>
                <TitleStyled>{l("registration")}</TitleStyled>
                <SubTitleStyled>{l("registration_sub_title")}</SubTitleStyled>
                <Form layout="vertical" size="large" onFinish={handleSubmit}>
                    {children}
                </Form>
            </FormContainerStyled>
        </ContainerStyled>
    )
}

export default Container
