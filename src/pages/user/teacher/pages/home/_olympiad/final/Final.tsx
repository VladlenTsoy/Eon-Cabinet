import React from "react"
import styled from "styled-components"
import {Card, Button} from "lib/ui"
import {EyeOutlined} from "@ant-design/icons"
import FirstSvg from "assets/images/olympiad/final/first.svg"
import SecondSvg from "assets/images/olympiad/final/second.svg"
import ThirdSvg from "assets/images/olympiad/final/third.svg"
import Profile from "../../_homework/profile/Profile"

const FinalStyled = styled.div`
    display: grid;
    gap: 1rem;
    align-items: center;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`

const RatingsStyled = styled.div`
    display: grid;
    gap: 1rem;
    align-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
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
                <RatingsStyled>
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
                </RatingsStyled>
                <div>
                    <Button
                        type="dashed"
                        icon={<EyeOutlined />}
                        block
                        size="large"
                    >
                        Подробнее
                    </Button>
                </div>
            </FinalStyled>
        </Card>
    )
}

export default Final
