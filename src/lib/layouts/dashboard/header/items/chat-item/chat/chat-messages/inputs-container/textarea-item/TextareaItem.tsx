import React from 'react';
import styled from "styled-components";
import TextArea from 'react-textarea-autosize'

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

const TextareaItem = () => {
    return <WrapperTextAreaStyled>
        <TextAreaStyled placeholder="Написать сообщение..."/>
    </WrapperTextAreaStyled>
};

export default TextareaItem;