import React from 'react';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal } from "antd";
import EditorWordNumberButton from "./EditorWordNumberButton";
import {useAppContext} from "../../../../../store/context/use-app-context";

const confirm = Modal.confirm;

interface WordNumberTableDropdownProps {
    record: any,
    fetch: any,
}

const WordNumberTableDropdown: React.FC<WordNumberTableDropdownProps> = ({record, fetch}) => {
    const {api} = useAppContext();

    const deleteWord = () =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: async () => {
                await api.user.delete(`admin/word-number/${record.id}`);
                fetch();
            },
        });

    const menu = <Menu>
        <Menu.Item>
            <EditorWordNumberButton title="Редактировать слово" fetch={fetch} wordNumber={record}>
                <EditOutlined /> Редактировать
            </EditorWordNumberButton>
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

export default WordNumberTableDropdown;