import React, {useState} from "react"
import {MenuOutlined} from "@ant-design/icons"
import {Button} from "antd"
import Modal from "../modal/Modal"
import styled from "styled-components"

export const MenuStyled = styled.div`
    > a {
        color: ${props => props.theme.color_main};
    }
    > span,
    div,
    a {
        display: block;
        padding: 0.75rem 1rem;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
            color: ${props => props.theme.color_primary};
            // background: ${props => props.theme["@primary-1"]};
        }
    }

    font-size: 16px;

    .anticon {
        min-width: 18px;
        margin-right: 15px;
        font-size: 18px;
    }
`

interface ModalMenuProps {
    button?: React.ReactNode
}

const ModalMenu: React.FC<ModalMenuProps> = ({children, button}) => {
    const [visible, setVisible] = useState(false)
    const open = () => setVisible(true)
    const close = () => setVisible(false)

    return (
        <>
            <Modal centered width={320} closable={false} visible={visible} onCancel={close} zIndex={999}>
                <MenuStyled onClick={close}>{children}</MenuStyled>
            </Modal>
            <span onClick={open}>
                {button || <Button type="primary" shape="circle" icon={<MenuOutlined />} />}
            </span>
        </>
    )
}

export default ModalMenu
