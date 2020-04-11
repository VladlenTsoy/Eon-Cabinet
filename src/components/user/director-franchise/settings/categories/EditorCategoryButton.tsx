import usingModalEditor from "../../../../../layouts/modal-editor/usingModalEditor";
import React from "react";
import {useSelector} from "react-redux";
import {message} from "antd";
import FormEditorCategoryItems from "../../../../../layouts/modal-editor/editor-category/FormEditorCategoryItems";

const EditorButton = usingModalEditor(FormEditorCategoryItems);

interface EditorCategoryButtonProps {
    title: string;
    category?: any;
    fetch: any;
}

const EditorCategoryButton: React.FC<EditorCategoryButtonProps> = ({title, children, category, fetch}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (category) {
            await api.user_general.put(`director-franchise/category/${category.id}`, values);
            message.success("Вы успешно изменили категорию!");
        } else {
            await api.user_general.post(`director-franchise/category`, values);
            message.success("Вы успешно добавили категорию!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        data={category ? {
            title: category.title,
            discipline_id: category.discipline_id,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorCategoryButton;