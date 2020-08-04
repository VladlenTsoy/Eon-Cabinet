import React from 'react';
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Modal } from "antd";
import EditorCountryButton from "./EditorCountryButton";
import {useAppContext} from "../../../../../store/context/use-app-context";

const confirm = Modal.confirm;

interface CountryTableDropdownProps {
    record: any,
    fetch: any,
}

const CountryTableDropdown: React.FC<CountryTableDropdownProps> = ({record, fetch}) => {
    const {api} = useAppContext();

    const deleteCountry = () =>
        confirm({
            title: 'Вы уверены, что хотите удалить?',
            okType: 'danger',
            onOk: async () => {
                await api.user.delete(`admin/country/${record.id}`);
                fetch();
            },
        });

    const menu = <Menu>
        <Menu.Item>
            <EditorCountryButton title="Редактировать страну" fetch={fetch} country={record}>
                <EditOutlined /> Редактировать
            </EditorCountryButton>
        </Menu.Item>
        <Menu.Item onClick={deleteCountry}>
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

export default CountryTableDropdown;