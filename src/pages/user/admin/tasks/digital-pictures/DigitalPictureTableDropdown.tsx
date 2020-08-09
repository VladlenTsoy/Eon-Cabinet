import React from 'react';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal } from "antd";
import EditorDigitalPictureButton from "./EditorDigitalPictureButton";

const confirm = Modal.confirm;

interface DigitalPictureTableDropdownProps {
    record: any,
    fetch: any,
}

// TODO - api
const DigitalPictureTableDropdown: React.FC<DigitalPictureTableDropdownProps> = ({record, fetch}) => {

    const deleteDigitalPicture = () =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: async () => {
                // await api.user.delete(`admin/digital-picture/${record.id}`);
                fetch();
            },
        });

    const menu = <Menu>
        <Menu.Item>
            <EditorDigitalPictureButton title="Редактировать Цифру-Картинку" fetch={fetch} digitalPicture={record}>
                <EditOutlined /> Редактировать
            </EditorDigitalPictureButton>
        </Menu.Item>
        <Menu.Item onClick={deleteDigitalPicture}>
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

export default DigitalPictureTableDropdown;