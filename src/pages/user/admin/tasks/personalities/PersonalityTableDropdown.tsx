import React from 'react';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal } from "antd";
import EditorPersonalityButton from "./EditorPersonalityButton";
import {useAppContext} from "../../../../../store/context/use-app-context";

const confirm = Modal.confirm;

interface PersonalityTableDropdownProps {
    record: any,
    fetch: any,
}

const PersonalityTableDropdown: React.FC<PersonalityTableDropdownProps> = ({record, fetch}) => {
    const {api} = useAppContext();

    const deletePersonality = () =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: async () => {
                await api.user.delete(`admin/personality/${record.id}`);
                fetch();
            },
        });

    const menu = <Menu>
        <Menu.Item>
            <EditorPersonalityButton title="Редактировать личность" fetch={fetch} personality={record}>
                <EditOutlined /> Редактировать
            </EditorPersonalityButton>
        </Menu.Item>
        <Menu.Item onClick={deletePersonality}>
            <DeleteOutlined /> Удалить
        </Menu.Item>
    </Menu>;

    return (
        <Dropdown
            overlay={menu}>
            <Button type="primary" shape="circle" icon={<MoreOutlined />}/>
        </Dropdown>
    );
};

export default PersonalityTableDropdown;