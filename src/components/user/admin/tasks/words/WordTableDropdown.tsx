import React from 'react';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal } from "antd";
import EditorWordButton from "./EditorWordButton";
import {useAppContext} from "../../../../../store/context/use-app-context";

const confirm = Modal.confirm;

interface WordTableDropdownProps {
    record: any,
    fetch: any,
}

const WordTableDropdown: React.FC<WordTableDropdownProps> = ({record, fetch}) => {
    const {api} = useAppContext();

    const deleteWord = () =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: async () => {
                await api.user.delete(`admin/word/${record.id}`);
                fetch();
            },
        });

    const menu = <Menu>
        <Menu.Item>
            <EditorWordButton title="Редактировать слово" fetch={fetch} word={record}>
                <EditOutlined /> Редактировать
            </EditorWordButton>
        </Menu.Item>
        <Menu.Item onClick={deleteWord}>
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

export default WordTableDropdown;