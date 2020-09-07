import React, {useCallback, useState} from "react"
import styled from "styled-components"
import AttachItem from "./attach-item/AttachItem"
import EmojiItem from "./emoji-item/EmojiItem"
import TextareaItem from "./textarea-item/TextareaItem"
import SendItem from "./send-item/SendItem"
import {useUser} from "../../../../../../hooks/use-user"
import {firestore} from "../../../../../../bin/firebase"
import EmojiContainer from "./emoji-container/EmojiContainer"

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

    const onChangeHandler = useCallback((value: string) => {
        setMessage(value)
    }, [])

    const onSubmit = async (e: any) => {
        e.preventDefault()
        if (message !== "") {
            const a =await firestore.collection("messages").add({
                contact_id: selectedContactId,
                user_id: user.id,
                message,
                created_at: new Date()
            })
            console.log(a)
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
