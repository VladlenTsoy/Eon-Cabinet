import React from "react"
import styled from "styled-components"
import ImageProfile from "./image-profile/ImageProfile"
import {Chat} from "../../../interfaces/Chat"
import LastMessage from "./content/last-message/LastMessage"
import InfoProfile from "./content/info-profile/InfoProfile"
import {changeSelectedChatId} from "../../../reducer/chats/chatsSlice"
import {
    useLastMessageByChatId,
    useSelectCountNotReadByChatId,
} from "../../../reducer/messages/messagesSelectors"
import {useCommonDispatch} from "../../../../../../store/common/store"
import {useUser} from "../../../../../../hooks/use-user"

const ContactItemStyled = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 50px 1fr;
    overflow: hidden;
    padding: 0.5rem 1rem;
    align-items: center;
    cursor: pointer;

    :hover {
        background: ${(props) => props.theme.color_hover_item};
    }

    .content {
      overflow: hidden;
    }
`

interface ContactItemProps {
    chat: Chat
}

const ContactItem: React.FC<ContactItemProps> = ({chat}) => {
    const {user} = useUser()
    const notRead = useSelectCountNotReadByChatId(chat.chat_id, user.id) || 0
    const lastMessage = useLastMessageByChatId(chat.chat_id) || chat.last_message
    const dispatch = useCommonDispatch()

    const onClickHandler = () => {
        dispatch(changeSelectedChatId(chat.chat_id))
    }

    return (
        <ContactItemStyled onClick={onClickHandler}>
            <ImageProfile contact={chat.contact}/>
            <div className="content">
                <InfoProfile chat={chat}/>
                {lastMessage && <LastMessage message={lastMessage} unread={notRead}/>}
            </div>
        </ContactItemStyled>
    )
}

export default ContactItem
