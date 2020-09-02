import React from "react"
import {SmileOutlined} from "@ant-design/icons"
import styled from "styled-components"

interface EmojiItemStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    active: boolean
}

const EmojiItemStyled: React.FC<EmojiItemStyledProps> = styled.div<EmojiItemStyledProps>`
  color: ${props => props.active ? props.theme.color_primary : props.theme.color_main}
`

interface EmojiItemProps {
    active: boolean
    setEmojiVisible: any
}

const EmojiItem: React.FC<EmojiItemProps> = ({setEmojiVisible, active}) => {
    const mouseEnterHandler = () => {
        setEmojiVisible(true)
    }

    const mouseLeaveHandler = () => {
        setEmojiVisible(false)
    }

    return <EmojiItemStyled active={active} onMouseLeave={mouseLeaveHandler} onMouseEnter={mouseEnterHandler}>
        <SmileOutlined/>
    </EmojiItemStyled>
}

export default EmojiItem