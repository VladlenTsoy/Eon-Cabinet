import React, {useState} from "react"
import {UserAddOutlined, LinkOutlined, CopyOutlined} from "@ant-design/icons"
import {Button, Modal} from "../../../../../../../../../lib/ui"
import {Input} from "antd"
import styled from "styled-components"

const CopyStyled = styled.span`
    display: inline-block;
    cursor: pointer;

    :hover {
        color: ${props => props.theme.color_primary};
    }
`

const AddStudent = () => {
    const [visible, setVisible] = useState(false)

    const close = () => setVisible(false)
    const open = () => setVisible(true)

    return (
        <>
            <Button type="second" size="large" icon={<UserAddOutlined />} onClick={open}>
                Добавить ученика
            </Button>
            <Modal title="Добавить ученика" visible={visible} onCancel={close}>
                <Input
                    addonBefore={<LinkOutlined />}
                    addonAfter={
                        <CopyStyled>
                            <CopyOutlined />
                        </CopyStyled>
                    }
                    defaultValue={`https://cabinet.eon.uz/registration/group/${5}`}
                />
            </Modal>
        </>
    )
}

export default AddStudent
