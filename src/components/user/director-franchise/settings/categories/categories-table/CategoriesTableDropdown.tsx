import React from 'react';
import { EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from "antd";
import DeleteCategoryButton from "./DeleteCategoryButton";
import EditorCategoryButton from "../EditorCategoryButton";

interface CategoriesTableDropdownProps {
    fetch: any;
    category: any;
}

const CategoriesTableDropdown: React.FC<CategoriesTableDropdownProps> = ({fetch, category}) => {
    const menu = () => <Menu>
        <Menu.Item>
            <EditorCategoryButton
                title="Редактировать категорию"
                fetch={fetch}
                category={category}>
                <EditOutlined /> Редактировать
            </EditorCategoryButton>
        </Menu.Item>
        <Menu.Item>
            <DeleteCategoryButton category={category} fetch={fetch}/>
        </Menu.Item>
    </Menu>;

    return (
        <Dropdown
            overlay={menu()}>
            <Button type="primary" shape="circle" icon={<MoreOutlined />}/>
        </Dropdown>
    );
};

export default CategoriesTableDropdown;