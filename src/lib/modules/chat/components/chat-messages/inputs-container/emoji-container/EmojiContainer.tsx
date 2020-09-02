import React, {useEffect} from "react"
import styled from "styled-components"

const EmojiContainerStyled = styled.div`
    background: ${(props) => props.theme["@component-background"]};
    font-size: 25px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    gap: 0.5rem;
    text-align: center;
    padding: 0.5rem;
    border-bottom: 1px solid ${(props) => props.theme.color_hover_item};
    overflow: hidden;
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    opacity: 0;

    > span {
        user-select: none;
        text-align: center;
        cursor: pointer;

        :hover {
            border-radius: 5px;
            background: ${(props) => props.theme.color_hover_item};
        }
    }
`

interface EmojiContainerProps {
    active: boolean
    setEmojiBlockVisible: any
    setMessage: any
}

const EmojiContainer: React.FC<EmojiContainerProps> = ({
    setEmojiBlockVisible,
    setMessage,
    active
}) => {
    let a: any

    const mouseEnterHandler = () => {
        clearTimeout(a)
        setEmojiBlockVisible(true)
    }

    const mouseLeaveHandler = () => {
        a = setTimeout(() => setEmojiBlockVisible(false), 300)
    }

    useEffect(() => {
        const emojiBlock = document.querySelectorAll(
            "#emoji-select-block > span"
        )

        emojiBlock.forEach(function (emoji) {
            emoji.addEventListener("click", function (event: any) {
                const textarea = document.getElementById(
                    "textarea-message-chat"
                )
                if (textarea) textarea.focus()
                setMessage(
                    (prevState: any) => prevState + event.target.textContent
                )
            })
        })
    }, [])

    return (
        <EmojiContainerStyled
            id="emoji-select-block"
            onMouseLeave={mouseLeaveHandler}
            onMouseEnter={mouseEnterHandler}
            className={active ? "fadeInUp" : "fadeOutDown"}
        >
            <span>😄</span>
            <span>😂</span>
            <span>😅</span>
            <span>😉</span>
            <span>😔</span>
            <span>😩</span>
            <span>😭</span>
            <span>😑</span>
            <span>😘</span>
            <span>😍</span>
        </EmojiContainerStyled>
    )
}

export default React.memo<EmojiContainerProps>(EmojiContainer)
