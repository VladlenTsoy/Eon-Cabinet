import React from "react";
import CategoryItems from "./category-items/CategoryItems";
import {message} from "antd";
import {useSelector} from "react-redux";
import usingModalEditor from "../../../../../layouts/modal-editor/usingModalEditor";

const EditorButton = usingModalEditor(CategoryItems);

interface EditorCategoryButtonProps {
    title: string;
    category?: any;
    fetch: any;
}

const EditorCategoryButton: React.FC<EditorCategoryButtonProps> = ({title, children, category, fetch}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (category) {
            await api.user_general.post(`admin/category/${category.id}`, values);
            message.success("Вы успешно изменили категорию!");
        } else {
            await api.user_general.post(`admin/category`, values);
            message.success("Вы успешно добавили категорию!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        isFranchise={category && !!category.franchise_id}
        data={category ? {
            title: category.title,
            discipline_id: category.discipline_id,
            center_id: category.center_id,
            franchise_id: category.franchise_id,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorCategoryButton;