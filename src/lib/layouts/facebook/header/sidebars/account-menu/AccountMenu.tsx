import React, {useState} from "react"
import {
    CaretDownOutlined,
    PoweroffOutlined
} from "@ant-design/icons"
import {Dropdown, Menu} from "antd"
import {SidebarButton} from "lib/layouts/facebook/header/sidebars/sidebar-button/SidebarButton"
import DarkSwitch from "../../../../dashboard/header/items/dark-switch/DarkSwitch"
import {AccountItem} from "../../../../dashboard/header/laptop/account-menu/AccountMenu"
import {useUser} from "../../../../../../hooks/use-user"
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect"
import {Drawer} from "../../../../../ui"
import styled from "styled-components"
import {useLocation} from "react-router-dom"

const AccountMenuDrawStyled = styled(Drawer)`
    .ant-drawer-wrapper-body .ant-drawer-body {
        padding: 0;
    }
`

const AccountMenu: React.FC = ({children}) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: "md"})
    const {logout} = useUser()
    const [visible, setVisible] = useState(false)

    const toggle = (visible: boolean) =>
        setVisible(visible)

    const menu = (
        <Menu>
            {children}
            <Menu.Divider/>
            <AccountItem key="theme">
                <DarkSwitch/>
            </AccountItem>
            <AccountItem onClick={logout} key="exit">
                <PoweroffOutlined/> Выход
            </AccountItem>
        </Menu>
    )

    const open = () => setVisible(true)
    const close = () => setVisible(false)

    if (isBreakpoint)
        return (
            <div>
                <SidebarButton active={visible} onClick={visible ? close : open}>
                    <CaretDownOutlined/>
                </SidebarButton>
                <AccountMenuDrawStyled
                    getContainer=".draw-container"
                    style={{position: "absolute"}}
                    visible={visible}
                    closable={false}
                    mask={false}
                    onClose={close}
                    zIndex={4}
                    notFooter
                >
                    {menu}
                </AccountMenuDrawStyled>
            </div>
        )

    return (
        <div>
            <Dropdown
                onVisibleChange={toggle}
                overlay={menu}
                arrow
                placement="bottomRight"
                // trigger={["click"]}
            >
                <SidebarButton active={visible}>
                    <CaretDownOutlined/>
                </SidebarButton>
            </Dropdown>
        </div>
    )
}

export default AccountMenu
