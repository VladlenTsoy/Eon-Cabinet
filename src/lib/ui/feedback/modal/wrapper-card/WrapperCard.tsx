import React from "react"
import style from "./WrapperCard.module.css"

interface WrapperCardProps {
    width: string | number
    visible: boolean
    centered: boolean
}

const WrapperCard: React.FC<WrapperCardProps> = ({visible, centered, children, width}) => {
    const _width = typeof width === "number" ? width + "px" : width

    return (
        <div
            role="document"
            style={{width: _width}}
            className={`${style.modal} ${centered ? style.centered : ""} ${
                visible ? style.open : style.close
            }`}
        >
            {children}
        </div>
    )
}

export default WrapperCard
