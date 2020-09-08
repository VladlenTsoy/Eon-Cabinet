import React, {useCallback, useState} from "react"
import styled from "styled-components"
import AttachItem from "./attach-item/AttachItem"
import EmojiItem from "./emoji-item/EmojiItem"
import TextareaItem from "./textarea-item/TextareaItem"
import SendItem from "./send-item/SendItem"
import {useUser} from "../../../../../../hooks/use-user"
import EmojiContainer from "./emoji-container/EmojiContainer"
import {useCommonDispatch} from "../../../../../../store/common/store"
import {addMessage} from "../../../reducer/messages/addMessage"

const InputMessageStyled = styled.form`
    display: grid;
    grid-template-columns: 50px 1fr 50px 50px;
    text-align: center;
    font-size: 25px;
    align-items: flex-end;
    position: relative;
    z-index: 555;
    background: ${(props) => props.theme["@component-background"]};

    > div {
        padding: 0.5rem 0.5rem;
    }
`

const ContainerStyled = styled.div`
    transition: all 0.3s ease-in-out;
    position: relative;
    overflow: visible;
`

interface InputsContainerProps {
    selectedContactId: number
}

const InputsContainer: React.FC<InputsContainerProps> = ({selectedContactId}) => {
    const {user} = useUser()
    const [emojiVisible, setEmojiVisible] = useState(false)
    const [emojiBlockVisible, setEmojiBlockVisible] = useState(false)
    const [message, setMessage] = useState<string>("")
    const dispatch = useCommonDispatch()

    const onChangeHandler = useCallback((value: string) => {
        setMessage(value)
    }, [])

    const onSubmit = async (e: any) => {
        e.preventDefault()
        if (message !== "") {
            dispatch(addMessage({chatId: selectedContactId, message, userId: user.id}))
            setMessage("")
        }
    }

    return (
        <ContainerStyled>
            {
                <EmojiContainer
                    active={emojiVisible || emojiBlockVisible}
                    setEmojiBlockVisible={setEmojiBlockVisible}
                    setMessage={setMessage}
                />
            }
            <InputMessageStyled onSubmit={onSubmit}>
                <AttachItem/>
                <TextareaItem
                    onChangeHandler={onChangeHandler}
                    onSubmit={onSubmit}
                    message={message}
                />
                <EmojiItem
                    setEmojiVisible={setEmojiVisible}
                    active={emojiVisible || emojiBlockVisible}
                />
                <SendItem/>
            </InputMessageStyled>
        </ContainerStyled>
    )
}

export default React.memo(InputsContainer)
