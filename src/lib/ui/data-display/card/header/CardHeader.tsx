import * as React from "react"
import styled from "./CardHeader.module.css"
import {Title} from "lib/ui"

interface CardHeaderProps {
    icons?: boolean
    title: string
}

const CardHeader: React.FC<CardHeaderProps> = ({title, icons, children}) => {
    return (
        <div className={styled.header}>
            <Title level={4} className={icons ? "second" : "basic"} style={{margin: 0}}>
                {title}
            </Title>
            <div className={`${styled.actions} ${icons ? styled.icons : ""}`}>{children}</div>
        </div>
    )
}

export default CardHeader
