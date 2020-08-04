import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { message, Modal } from "antd";
import {useAppContext} from "../../../../../../store/context/use-app-context";

interface DeleteCategoryButtonProps {
    category: any;
    fetch: any;
}

const DeleteCategoryButton: React.FC<DeleteCategoryButtonProps> = ({category, fetch}) => {
    const {api} = useAppContext();

    const deleteCategory = async (category: any) => {
        Modal.confirm({
            title: `Удалить категорию (${category.title})`,
            content: `Вы действительно хотите удалить категорию (${category.title})?`,
            okType: 'danger',
            async onOk() {
                try {
                    const response = await api.user.delete(`director-franchise/category/${category.id}`);
                    if (response.data.status === 'success') {
                        message.info(`Вы успешно удалили категорию: ${category.title}.`);
                        fetch();
                    }
                } catch (e) {
                    if (e.response)
                        message.error(e.response.data.message);
                    else
                        message.error(`Произошла неизвестная ошибка!`);
                }
            }
        });
    };

    return (
        <span onClick={() => deleteCategory(category)}>
            <DeleteOutlined /> Удалить
        </span>
    );
};

export default DeleteCategoryButton;