import React from "react"
import styled from "styled-components"
import {TrophyOutlined, EyeOutlined} from "@ant-design/icons"
import {Avatar, Card} from "lib/ui"
import Stars from "../_homework/Stars"
import {Button} from "antd"
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect"

const HeaderStyled = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`

const IconStyled = styled.div`
    font-size: 25px;
    color: ${(props) => props.theme.color_main};
    margin-right: 0.5rem;
`

const TitleStyled = styled.h2`
    margin-bottom: 0;
    margin-right: auto;
    color: ${(props) => props.theme.color_main};
`

const TimeDateStyled = styled.div`
    color: ${(props) => props.theme.color_second};
`

const ContainerStyled = styled.div``

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

const ProfileStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const AvatarStyled = styled.div`
    margin-right: 0.5rem;
`

const FullNameStyled = styled.div`
    font-size: 14px;
`

const IdStyled = styled.div`
    font-size: 11px;
    color: ${(props) => props.theme.color_second};

    span {
        color: ${(props) => props.theme.color_warning};
    }
`

const StarsStyled = styled.div`
    max-width: 130px;
    display: flex;
    margin-top: -0.75rem;
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

const Olympiad = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})

    return (
        <>
            <HeaderStyled>
                <IconStyled>
                    <TrophyOutlined />
                </IconStyled>
                <TitleStyled>Олимпиада #1</TitleStyled>
                <TimeDateStyled>16:20 18 авг</TimeDateStyled>
            </HeaderStyled>
        <Card>

            <ContainerStyled>
                <StudentProgressStyled>
                    <ProfileStyled>
                        <AvatarStyled>
                            <Avatar
                                src="http://192.168.1.37:8000/images/default.svg"
                                alt="name"
                                width="50px"
                            />
                        </AvatarStyled>
                        <div>
                            <FullNameStyled>Цой Владлен</FullNameStyled>
                            <IdStyled>
                                ID: <span>2066</span>
                            </IdStyled>
                        </div>
                    </ProfileStyled>
                    {!isBreakpoint && (
                        <StarsStyled>
                            <Stars numberOfStars={3} />
                        </StarsStyled>
                    )}
                    <AnswerStyled>
                        <span>100</span>
                        <span className="slash">/</span>
                        <span className="success">100</span>
                    </AnswerStyled>
                </StudentProgressStyled>
            </ContainerStyled>
        </Card>
            </>
    )
}

export default Olympiad
