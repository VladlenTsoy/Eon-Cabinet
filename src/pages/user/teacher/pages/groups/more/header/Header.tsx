import React from "react"
import styled from "styled-components"
import {Button} from "lib/ui"
import {CarryOutFilled, IdcardFilled} from "@ant-design/icons"
import DetailsActions from "./details-actions/DetailsActions"
import HomeworkActions from "./homework-actions/HomeworkActions"
import {TabStudentsType} from "../Group"

const HeaderStyled = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .tabs {
        margin-right: auto;
        > .vl-button:not(:last-child) {
            margin-right: 0.5rem;
        }
    }

    .right-actions {
        > .vl-button:not(:last-child) {
            margin-right: 0.5rem;
        }
    }
`

interface HeaderProps {
    tab: TabStudentsType
    changeTabHandler: (val: TabStudentsType) => void
}

const Header: React.FC<HeaderProps> = ({tab, changeTabHandler}) => {
    return (
        <HeaderStyled>
            <div className="tabs">
                <Button
                    type={tab === "details" ? "primary" : "default"}
                    size="large"
                    icon={<IdcardFilled />}
                    onClick={() => changeTabHandler("details")}
                >
                    Данные
                </Button>
                <Button
                    type={tab === "events" ? "primary" : "default"}
                    size="large"
                    icon={<CarryOutFilled />}
                    onClick={() => changeTabHandler("events")}
                >
                    Домашние задания
                </Button>
            </div>
            <div className="right-actions">
                {tab === "details" ? <DetailsActions /> : <HomeworkActions />}
            </div>
        </HeaderStyled>
    )
}

export default Header
