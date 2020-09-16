import React, {useEffect} from "react"
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
    let a: any;

    const mouseEnterHandler = () => {
        clearTimeout(a)
        setEmojiVisible(true)
    }

    const mouseLeaveHandler = () => {
        a = setTimeout(() => setEmojiVisible(false), 500)
    }

    useEffect(() => {
        return () => {
            clearTimeout(a)
        }
    }, [])

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
