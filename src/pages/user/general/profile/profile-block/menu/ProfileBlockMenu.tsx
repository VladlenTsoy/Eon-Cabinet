import React from "react";
import {EditOutlined} from '@ant-design/icons';
import {Menu} from "antd";
import styled from "styled-components";
import ItemColor from "./item-color/ItemColor";
import ItemBlock from "../../../../director-franchise/layouts/items/ItemBlock";
import ItemPassword from "./item-password/ItemPassword";
import ItemEmailVerification from "./ItemEmailVerification";
import EditorButton from "../../../../teacher/pages/groups/more/nav-buttons/editor-button/EditorButton";

const MenuWrapper = styled(Menu)`
  &.ant-menu {
    text-align: left;
    border: 0;

    .ant-menu-item, .ant-menu-submenu-title {
      .anticon {
        margin-right: 1rem;
      }

      &:active {
        background: none;
      }
    }

    &:not(.ant-menu-horizontal) {
      .ant-menu-item-selected {
        background: none;
      }
    }
  }
`;

interface ProfileBlockMenuProps {
    currentUser: any;
    changeDataCurrentUser?: any;
    setting: {
        edit?: boolean;
        email?: boolean;
        color?: boolean;
        password?: boolean;
        block?: boolean;
    }
}

const ProfileBlockMenu: React.FC<ProfileBlockMenuProps> = ({currentUser, changeDataCurrentUser, setting}) => {
    return (
        <MenuWrapper>
            {
                setting.edit &&
                <Menu.Item>
                    <EditorButton title="Редактировать профиль">
                        <EditOutlined/> Редактировать
                    </EditorButton>
                </Menu.Item>
            }
            {
                setting.color &&
                <Menu.Item>
                    <ItemColor currentUser={currentUser}/>
                </Menu.Item>
            }
            {
                setting.email &&
                <Menu.Item disabled={!!currentUser.email_verified_at}>
                    <ItemEmailVerification
                        currentUser={currentUser}
                        changeDataCurrentUser={changeDataCurrentUser}/>
                </Menu.Item>
            }
            {
                setting.block &&
                <Menu.Item>
                    <ItemBlock user={currentUser}/>
                </Menu.Item>
            }
            {
                setting.password &&
                <Menu.Item>
                    <ItemPassword currentUser={currentUser}/>
                </Menu.Item>
            }
        </MenuWrapper>
    );
};

export default ProfileBlockMenu;