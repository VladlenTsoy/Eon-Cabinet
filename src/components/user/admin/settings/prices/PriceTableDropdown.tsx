import React from 'react';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal } from "antd";
import EditorPriceButton from "./EditorPriceButton";
import {useAppContext} from "../../../../../store/context/use-app-context";

const confirm = Modal.confirm;

interface PriceTableDropdownProps {
    record: any,
    fetch: any,
}

const PriceTableDropdown: React.FC<PriceTableDropdownProps> = ({record, fetch}) => {
    const {api} = useAppContext();

    const deletePrice = () =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: async () => {
                await api.user.delete(`admin/price/${record.id}`);
                fetch();
            },
        });

    const menu = <Menu>
        <Menu.Item>
            <EditorPriceButton title="Редактировать цену" fetch={fetch} price={record}>
                <EditOutlined /> Редактировать
            </EditorPriceButton>
        </Menu.Item>
        <Menu.Item onClick={deletePrice}>
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

export default PriceTableDropdown;