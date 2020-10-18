import React from "react"
import style from "./Badge.module.css"

interface BadgeProps {
    count: number
    dot?: boolean
    status?: "success" | "processing" | "default" | "error" | "warning"
    overflowCount?: number
}

const Badge: React.FC<BadgeProps> = ({
    count,
    dot = false,
    status = "error",
    overflowCount = 99,
    children
}) => {
    return (
        <div className={style.badge}>
            {children}
            <sup className={`${dot ? style.dot : style.number} ${style[status]}`}>
                {!dot ? (count > overflowCount ? `${overflowCount}+` : count) : null}
            </sup>
        </div>
    )
}

export default Badge
