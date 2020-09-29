import React from "react"
import styled from "styled-components"
import {Card} from "../../../../../../lib/ui"
import CheckSvg from "assets/images/hints/initial/check.svg"
import GroupSvg from "assets/images/hints/initial/team-work.svg"
import StudentSvg from "assets/images/hints/initial/student.svg"
import Student2Svg from "assets/images/hints/initial/student_2.svg"
// import CategoriesSvg from "assets/images/hints/initial/folder.svg"
import SendSvg from "assets/images/hints/initial/send.svg"
import HomeworkSvg from "assets/images/hints/initial/homework.svg"
import FlagSvg from "assets/images/hints/initial/flag.svg"

const InitialHintStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.5rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr;
    }

    > div {
        height: 150px;
        background: ${(props) => props.theme["@layout-body-background"]};
        width: 100%;
        border-radius: 10px;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        filter: grayscale(1);
        opacity: 0.5;
        transition: all 0.3s ease-in-out;
        border: 1px dashed ${(props) => props.theme["@component-background"]};

        .number {
            position: absolute;
            left: 15px;
            font-size: 60px;
            font-weight: 600;
            color: ${(props) => props.theme.color_minimal};
            top: 32px;

            @media (max-width: 768px) {
                font-size: 30px;
                top: 52px;
            }
        }

        &.check {
            background: ${(props) => props.theme["@component-background"]};
            filter: grayscale(0);
        }

        &.active {
            cursor: pointer;
            opacity: 1;
            filter: grayscale(0);
            background: ${(props) => props.theme["@component-background"]};

            :hover {
                border: 1px dashed ${(props) => props.theme.light_color_border};
                color: ${(props) => props.theme.color_primary};
            }
        }

        .title {
            text-align: center;
            margin-bottom: 0.5rem;
            line-height: 1;
        }

        .image {
            width: 80px;
            margin: 0 auto;

            @media (max-width: 768px) {
                width: 60px;
            }

            > img {
                width: 100%;
            }

            &.students-image {
                display: flex;
                align-items: center;
                position: relative;

                img {
                    position: relative;
                }

                img:first-child {
                    margin-left: -1.5rem;
                }

                img:last-child {
                    left: -2rem;
                }

                @media (max-width: 768px) {
                    img:first-child {
                        margin-left: -1rem;
                    }

                    img:last-child {
                        left: -1.5rem;
                    }
                }
            }
        }
    }
`

const InitialHint = () => {
    return (
        <Card>
            <Card.Title
                title="Добро пожаловать!"
                subTitle={
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, cumque, quasi. Animi aperiam facilis harum minus saepe sapiente sint soluta ut velit. Accusamus cumque delectus fuga, illum iste non odio!"
                }
            />
            <InitialHintStyled>
                <div className="check">
                    <span className="number">1</span>
                    <div className="title">Создать категории</div>
                    <div className="image">
                        {/*<img src={CategoriesSvg} alt="categories" />*/}
                        <img src={CheckSvg} alt="check" />
                    </div>
                </div>
                <div className="active">
                    <span className="number">2</span>
                    <div className="title">Создать группу</div>
                    <div className="image">
                        <img src={GroupSvg} alt="group" />
                    </div>
                </div>
                <div>
                    <span className="number">3</span>
                    <div className="title">Создать ученика</div>
                    <div className="image students-image">
                        <img src={StudentSvg} alt="girl" />
                        <img src={Student2Svg} alt="boy" />
                    </div>
                </div>
                <div>
                    <span className="number">4</span>
                    <div className="title">Создать домащнее задание</div>
                    <div className="image">
                        <img src={HomeworkSvg} alt="homework" />
                    </div>
                </div>
                <div>
                    <span className="number">5</span>
                    <div className="title">Отправить домашнее задание</div>
                    <div className="image">
                        <img src={SendSvg} alt="homework-send" />
                    </div>
                </div>
                <div>
                    <span className="number">6</span>
                    <div className="title">Завершить</div>
                    <div className="image">
                        <img src={FlagSvg} alt="homework-send" />
                    </div>
                </div>
            </InitialHintStyled>
        </Card>
    )
}

export default InitialHint
