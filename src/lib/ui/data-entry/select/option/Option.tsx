import React from "react"
import styled from "./Option.module.css"

interface OptionProps {
    value: any
    onClick?: (value: any) =>  void
}

const Option:React.FC<OptionProps> = ({children, value, onClick}) => {
    const onClickHandler = () => {
        if(onClick)
        onClick(value)
    }

    return (
        <span onClick={onClickHandler}>
            {children}
        </span>
    )
}

export default Option