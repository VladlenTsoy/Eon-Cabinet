import React, {useState} from "react"
import {
    CaretDownOutlined,
    PoweroffOutlined
} from "@ant-design/icons"
import {Badge, Dropdown, Menu} from "antd"
import {SidebarButton} from "lib/layouts/facebook/header/sidebars/sidebar-button/SidebarButton"
import DarkSwitch from "../../../../dashboard/header/items/dark-switch/DarkSwitch"
import {AccountItem} from "../../../../dashboard/header/laptop/account-menu/AccountMenu"
import {useUser} from "../../../../../../hooks/use-user"

const AccountMenu: React.FC = ({children}) => {
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

    return (
        <div>
            <Badge>
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
            </Badge>
        </div>
    )
}

export default AccountMenu
