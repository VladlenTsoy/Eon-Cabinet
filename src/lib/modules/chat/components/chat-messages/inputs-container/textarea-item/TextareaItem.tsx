import React, {useRef, useState} from "react"
import styled from "styled-components"
import TextArea from "react-textarea-autosize"

const WrapperTextAreaStyled = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const TextAreaStyled = styled(TextArea)`
  resize: none;
  border: 0;
  font-size: 16px;
  width: 100%;
  background: none;
  
  :focus {
    border: 0;
    outline: none;
  }
`

interface TextareaItemProps {
    message?: string
    onChangeHandler: any
    onSubmit: any
}

const TextareaItem: React.FC<TextareaItemProps> = ({onChangeHandler, onSubmit, message}) => {
    const a = (e: any) => {
        onChangeHandler(e.target.value)
    }

    const onKeyDownHandler = (e: any) => {
        if (e.keyCode === 13) {
            if (e.ctrlKey) {
                onChangeHandler((prevState: string) => prevState + "\n")
                return true
            }
            return onSubmit(e)
        }
    }

    return <WrapperTextAreaStyled>
        <TextAreaStyled
            maxRows={5}
            value={message}
            placeholder="Написать сообщение..."
            name="message"
            onChange={a}
            onKeyDown={onKeyDownHandler}
        />
    </WrapperTextAreaStyled>
}

export default TextareaItem