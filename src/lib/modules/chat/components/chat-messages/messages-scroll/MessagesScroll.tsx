import React, {useCallback, useEffect, useState} from "react"
import styled from "styled-components"
import {
    useLastMessageByChatId,
    useSelectMessagesByChatId,
    useCurrentPageMessagesByChatId,
    useLastPageMessagesByChatId
} from "../../../reducer/messages/messagesSelectors"
import {Chat} from "../../../interfaces/Chat"
import LoadingBlock from "./loading-block/LoadingBlock"
import {useCommonDispatch} from "../../../../../../store/common/store"
import {fetchMessagesByChatId} from "../../../reducer/messages/fetchMessagesByChatId"
import MessagesContainer from "./messages-container/MessagesContainer"

interface MessagesScrollStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    loading: "true" | "false"
}

const MessagesScrollStyled: React.FC<MessagesScrollStyledProps> = styled.div<MessagesScrollStyledProps>`
    padding-top: ${props => props.loading === "true" ? "110px" : "0.5rem"};
    height: 100%;
    background: ${(props) => props.theme["@layout-body-background"]};
    overflow-x: hidden;
    overflow-y: scroll;
    transition: all 0.5s ease-in-out;
`

interface MessagesScrollProps {
    chatId: Chat["chat_id"]
}

const MessagesScroll: React.FC<MessagesScrollProps> = ({chatId}) => {
    const messages = useSelectMessagesByChatId(chatId)
    const currentPage = useCurrentPageMessagesByChatId(chatId)
    const lastPage = useLastPageMessagesByChatId(chatId)
    const lastMessage = useLastMessageByChatId(chatId)
    const [page, setPage] = useState(currentPage)
    const [isMoreLoading, setIsMoreLoading] = useState(false)
    const dispatch = useCommonDispatch()

    useEffect(() => {
        if (lastMessage) {
            const scrollBlock = document.getElementById("scroll-chat")
            if (scrollBlock) scrollBlock.scrollTop = scrollBlock.scrollHeight
        }
    }, [lastMessage])

    useEffect(() => {
        const promise = dispatch(fetchMessagesByChatId({chatId, page}))
        promise.then(() => {
            setIsMoreLoading(false)
        })
        return () => {
            promise.abort()
        }
    }, [dispatch, page])

    const scrollMoreHandler = useCallback(
        (event) => {
            if (event.target.scrollTop < 50) {
                if (lastPage > currentPage) {
                    event.target.scrollTop = 51
                    if (!isMoreLoading) {
                        setIsMoreLoading(true)
                        setPage((prevState) => ++prevState)
                    }
                }
            }
        },
        [lastPage, currentPage, isMoreLoading]
    )

    return (
        <MessagesScrollStyled
            loading={isMoreLoading ? "true" : "false"}
            id="scroll-chat"
            className="fadeIn animated"
            onScroll={scrollMoreHandler}
        >
            <LoadingBlock chatId={chatId}/>
            <MessagesContainer messages={messages}/>
        </MessagesScrollStyled>
    )
}

export default React.memo(MessagesScroll)
