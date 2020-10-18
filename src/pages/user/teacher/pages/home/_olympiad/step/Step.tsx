import React from "react"
import Ratings from "./ratings/Ratings"
import {Card, Button} from "lib/ui"
import styled from "styled-components"
import {EyeOutlined} from "@ant-design/icons"

const Title2Styled = styled.div`
    text-align: center;
`

const ContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 1rem;
    //justify-content: center;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`

const StatisticStyled = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const StudentStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    > span:not(:last-child) {
        margin-right: 0.5rem;
    }

    .text {
        color: ${(props) => props.theme.color_second};
    }

    .count-success {
        font-size: 35px;
        color: ${(props) => props.theme.color_success};
    }

    .count-all {
        font-size: 35px;
    }
`

const StepsStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    > span:not(:last-child) {
        margin-right: 0.5rem;
    }

    .step-count {
        font-size: 35px;
    }

    .text {
        color: ${(props) => props.theme.color_second};
    }
`

const Step = () => {
    return (
        <Card>
            <Title2Styled>
                <h2>Завершился 1 этап</h2>
            </Title2Styled>
            <ContainerStyled>
                <Ratings />
                <StatisticStyled>
                    <StudentStyled>
                        <span className="count-success">238</span>
                        <span className="text">успешно завершили из</span>
                        <span className="count-all">562</span>
                    </StudentStyled>
                    <StepsStyled>
                        <span className="text">Осталось</span>
                        <span className="step-count">6</span>
                        <span className="text">этапов</span>
                    </StepsStyled>
                    <div>
                        <Button
                            type="dashed"
                            icon={<EyeOutlined />}
                            size="large"
                            block
                        >
                            Подробнее
                        </Button>
                    </div>
                </StatisticStyled>
            </ContainerStyled>
        </Card>
    )
}

export default Step
