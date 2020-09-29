import React from "react"
import {Card} from "../../../../../../lib/ui"
import {Button} from "antd"
import styled from "styled-components"
import {EyeOutlined} from "@ant-design/icons"
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect"
import Header from "../header/Header"
import Profile from "./profile/Profile"

const StudentProgressStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    :not(:last-child) {
        padding-bottom: 0.75rem;
        border-bottom: 1px solid
            ${(props) => props.theme["@layout-body-background"]};
        margin-bottom: 0.75rem;
    }

    > div:not(:last-child) {
        margin-right: 1rem;
    }

    @media (max-width: 767px) {
        > div:not(:last-child) {
            margin-right: 0.5rem;
        }
    }
`

const AnswerStyled = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;

    .slash {
        color: ${(props) => props.theme.color_minimal};
    }

    > span:not(:last-child) {
        margin-right: 0.25rem;
    }

    @media (max-width: 767px) {
        font-size: 25px;
    }
`

const ButtonStyled = styled.div``

const Homework = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})

    return (
        <>
            <Header type="homework" title="Уровень #1" date="16:20 18 авг" />
            <Card>
                <StudentProgressStyled>
                    <Profile />
                    <AnswerStyled>
                        <span className="success">100</span>
                        <span className="slash">/</span>
                        <span>100</span>
                    </AnswerStyled>
                    <ButtonStyled>
                        <Button
                            type="dashed"
                            icon={<EyeOutlined />}
                            shape={isBreakpoint && "circle"}
                        >
                            {!isBreakpoint && "Подробнее"}
                        </Button>
                    </ButtonStyled>
                </StudentProgressStyled>
            </Card>
        </>
    )
}

export default Homework
