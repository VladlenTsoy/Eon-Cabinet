import React from 'react';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal } from "antd";
import EditorCategoryButton from "./EditorCategoryButton";
import {useAppContext} from "../../../../../store/context/use-app-context";

const confirm = Modal.confirm;

interface CityTableDropdownProps {
    record: any,
    fetch: any,
}

const CategoryTableDropdown: React.FC<CityTableDropdownProps> = ({record, fetch}) => {
    const {api} = useAppContext();

    const deleteCategory = () =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: async () => {
                await api.user.delete(`admin/category/${record.id}`);
                fetch();
            },
        });

    const menu = <Menu>
        <Menu.Item>
            <EditorCategoryButton title="Редактировать город" fetch={fetch} category={record}>
                <EditOutlined /> Редактировать
            </EditorCategoryButton>
        </Menu.Item>
        <Menu.Item onClick={deleteCategory}>
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

export default CategoryTableDropdown;