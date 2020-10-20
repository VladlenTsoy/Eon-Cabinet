import React from "react"
import styled from "./DrawerCard.module.css"

const DrawerCard: React.FC = ({children}) => {
    return (
        <div className={styled.card}>
            <div className={styled.body}>{children}</div>
        </div>
    )
}

export default DrawerCard
