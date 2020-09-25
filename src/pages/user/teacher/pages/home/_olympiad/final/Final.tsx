import React from "react"
import styled from "styled-components"
import {Card} from "../../../../../../../lib/ui"
import {EyeOutlined} from "@ant-design/icons"
import {Button} from "antd"
import FirstSvg from "assets/images/olympiad/final/first.svg"
import SecondSvg from "assets/images/olympiad/final/second.svg"
import ThirdSvg from "assets/images/olympiad/final/third.svg"
import Profile from "../../_homework/profile/Profile"

const FinalStyled = styled.div`
    display: grid;
    gap: 1rem;
    align-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    margin-bottom: 1rem;
`

const BlockStyled = styled.div`
    display: flex;

    .profile {
    }

    .image {
        margin-right: 0.5rem;
        width: 70px;

        img {
            width: 100%;
        }
    }
`

const Final = () => {
    return (
        <Card>
            <h2>Победители</h2>
            <FinalStyled>
                <BlockStyled>
                    <div className="image">
                        <img src={FirstSvg} alt="" />
                    </div>
                    <div className="profile">
                        <Profile />
                    </div>
                </BlockStyled>
                <BlockStyled>
                    <div className="image">
                        <img src={SecondSvg} alt="" />
                    </div>
                    <div className="profile">
                        <Profile />
                    </div>
                </BlockStyled>
                <BlockStyled>
                    <div className="image">
                        <img src={ThirdSvg} alt="" />
                    </div>
                    <div className="profile">
                        <Profile />
                    </div>
                </BlockStyled>
            </FinalStyled>
            <Button type="dashed" icon={<EyeOutlined />} block size="large">
                Подробнее
            </Button>
        </Card>
    )
}

export default Final
