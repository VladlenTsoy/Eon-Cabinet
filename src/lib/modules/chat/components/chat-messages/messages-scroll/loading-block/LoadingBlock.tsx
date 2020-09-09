import React from "react"
import styled from "styled-components"
import {useLoadingMessagesByChatId} from "../../../../reducer/messages/messagesSelectors"
import {LoadingOutlined} from "@ant-design/icons"
import {Chat} from "../../../../interfaces/Chat"

const LoadingStyled = styled.div`
    position: absolute;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: ${(props) => props.theme["@component-background"]};
    animation-duration: 1s;
    animation-fill-mode: both;
    top: 0.5rem;

    .anticon {
        margin-right: 0.5rem;
    }
`

interface LoadingBlockProps {
    chatId: Chat["chat_id"]
}

const LoadingBlock: React.FC<LoadingBlockProps> = ({chatId}) => {
    const loading = useLoadingMessagesByChatId(chatId)

    return (
        <LoadingStyled className={loading ? "fadeIn" : "fadeOut"}>
            <LoadingOutlined />
            Загрузка...
        </LoadingStyled>
    )
}

export default React.memo(LoadingBlock)
