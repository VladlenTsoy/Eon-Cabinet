import React from 'react';
import styled from "styled-components";
import EmogiItem from "./emogi-item/EmogiItem";
import AttachItem from "./attach-item/AttachItem";
import TextareaItem from "./textarea-item/TextareaItem";
import SendItem from "./send-item/SendItem";

const InputMessageStyled = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 50px 50px;
  text-align: center;
  font-size: 25px;
  align-items: flex-end;
  
  > div {
    padding: 0.5rem 0.5rem;
  }
`

const InputsContainer = () => {
    return <InputMessageStyled>
        <AttachItem/>
        <TextareaItem/>
        <EmogiItem/>
        <SendItem/>
    </InputMessageStyled>
};

export default InputsContainer;