import React from "react"
import {SendOutlined} from "@ant-design/icons"
import styled from "styled-components"

const ButtonStyled = styled.button`
    background: ${props => props.theme['@component-background']};
    border: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    
    :hover {
      color: ${props => props.theme.color_primary};
    }
`

const SendItem = () => {
    return (
        <ButtonStyled type="submit">
            <SendOutlined />
        </ButtonStyled>
    )
}

export default SendItem
