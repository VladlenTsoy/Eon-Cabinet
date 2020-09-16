import React, {useState} from "react"
import {
    CaretDownOutlined,
    PoweroffOutlined,
    QuestionCircleOutlined
} from "@ant-design/icons"
import {Badge, Dropdown, Menu, Modal} from "antd"
import {SidebarButton} from "lib/layouts/facebook/header/sidebars/sidebar-button/SidebarButton"
import DarkSwitch from "../../../../dashboard/header/items/dark-switch/DarkSwitch"
import {AccountItem} from "../../../../dashboard/header/laptop/account-menu/AccountMenu"
import {useDispatch} from "react-redux"
import {logoutUser} from "../../../../../../store/common/user/logoutUser"

const confirm = Modal.confirm

const AccountMenu: React.FC = ({children}) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)

    const toggle = () => setVisible(!visible)

    // Выход
    const logout = () => {
        confirm({
            zIndex: 1002,
            title: "Вы действительно хотите выйти?",
            icon: <QuestionCircleOutlined />,
            onOk: async () => {
                dispatch(logoutUser());
            }
        })
    }

    const menu = (
        <Menu>
            {children}
            <Menu.Divider />
            <AccountItem key="theme">
                <DarkSwitch />
            </AccountItem>
            <AccountItem onClick={logout} key="exit">
                <PoweroffOutlined /> Выход
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
                        <CaretDownOutlined />
                    </SidebarButton>
                </Dropdown>
            </Badge>
        </div>
    )
}

export default AccountMenu
