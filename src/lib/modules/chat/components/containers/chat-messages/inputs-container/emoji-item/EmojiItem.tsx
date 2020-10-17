import React, {useEffect, useState} from "react"
import {SmileOutlined} from "@ant-design/icons"
import styled from "styled-components"

interface EmojiItemStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    active: boolean
}

const EmojiItemStyled: React.FC<EmojiItemStyledProps> = styled.div<
    EmojiItemStyledProps
>`
  color: ${(props) =>
      props.active ? props.theme.color_primary : props.theme.color_main}
  
  :hover {
    cursor: pointer;
    color: ${(props) => props.theme.color_primary}
  }
`

interface EmojiItemProps {
    active: boolean
    setEmojiVisible: any
}

const EmojiItem: React.FC<EmojiItemProps> = ({setEmojiVisible, active}) => {
    const [_timeout, _setTimeout] = useState<any>(null)

    const mouseEnterHandler = () => {
        clearTimeout(_timeout)
        setEmojiVisible(true)
    }

    const mouseLeaveHandler = () => {
        _setTimeout(setTimeout(() => setEmojiVisible(false), 500))
    }

    useEffect(() => {
        return () => {
            clearTimeout(_timeout)
        }
    }, [_timeout])

    return (
        <EmojiItemStyled
            active={active}
            onMouseLeave={mouseLeaveHandler}
            onMouseEnter={mouseEnterHandler}
        >
            <SmileOutlined />
        </EmojiItemStyled>
    )
}

export default EmojiItem
