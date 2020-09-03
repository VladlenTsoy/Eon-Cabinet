import React from "react"
import {PaperClipOutlined} from "@ant-design/icons"
import styled from "styled-components"

const AttachItemStyle = styled.div`
    :hover {
        color: ${(props) => props.theme.color_primary};
    }
`

const AttachItem = () => {
    return (
        <AttachItemStyle>
            <PaperClipOutlined />
        </AttachItemStyle>
    )
}

export default AttachItem
