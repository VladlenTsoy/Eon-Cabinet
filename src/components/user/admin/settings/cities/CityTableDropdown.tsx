import React from 'react';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal } from "antd";
import {useSelector} from "react-redux";
import EditorCityButton from "./EditorCityButton";

const confirm = Modal.confirm;

interface CityTableDropdownProps {
    record: any,
    fetch: any,
}

const CityTableDropdown: React.FC<CityTableDropdownProps> = ({record, fetch}) => {
    const {api} = useSelector((state: any) => (state));

    const deleteCity = () =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: async () => {
                await api.user_general.delete(`admin/city/${record.id}`);
                fetch();
            },
        });

    const menu = <Menu>
        <Menu.Item>
            <EditorCityButton title="Редактировать город" fetch={fetch} city={record}>
                <EditOutlined /> Редактировать
            </EditorCityButton>
        </Menu.Item>
        <Menu.Item onClick={deleteCity}>
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

export default CityTableDropdown;