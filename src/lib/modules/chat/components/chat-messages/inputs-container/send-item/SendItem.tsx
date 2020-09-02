import React from "react"
import {SendOutlined} from "@ant-design/icons"
import styled from "styled-components"

const ButtonStyled = styled.button`
    background: ${props => props.theme["@component-background"]};
    border: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    padding: 0;
    outline: none;
    
    :focus {
      outline: none;
    }
    
    :hover {
      color: ${props => props.theme.color_primary};
    }
`

const SendItem = () => {
    return (
        <div>
            <ButtonStyled type="submit">
                <SendOutlined/>
            </ButtonStyled>
        </div>
    )
}

export default SendItem
