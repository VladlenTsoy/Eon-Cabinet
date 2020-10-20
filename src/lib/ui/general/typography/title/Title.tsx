import React from "react"
import styled from "./Title.module.css"

interface TitleProps {
    level?: 1 | 2 | 3 | 4 | 5
    className?: HTMLDivElement['className']
    style?: any
}

const Title: React.FC<TitleProps> = ({level = 1, children, className, style}) => {
    return (
        <>
            {level === 1 && <h1 className={`${className} ${styled.title}`} style={style}>{children}</h1>}
            {level === 2 && <h2 className={`${className} ${styled.title}`} style={style}>{children}</h2>}
            {level === 3 && <h3 className={`${className} ${styled.title}`} style={style}>{children}</h3>}
            {level === 4 && <h4 className={`${className} ${styled.title}`} style={style}>{children}</h4>}
            {level === 5 && <h5 className={`${className} ${styled.title}`} style={style}>{children}</h5>}
        </>
    )
}

export default Title
