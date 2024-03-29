import usingModalEditor from "../../../../../layouts/modal-editor/usingModalEditor";
import React from "react";
import {message} from "antd";
import FormEditorCategoryItems from "../../../../../layouts/modal-editor/editor-category/FormEditorCategoryItems";
import {useAppContext} from "../../../../../store/context/use-app-context";

const EditorButton = usingModalEditor(FormEditorCategoryItems);

interface EditorCategoryButtonProps {
    title: string;
    category?: any;
    fetch: any;
}

const EditorCategoryButton: React.FC<EditorCategoryButtonProps> = ({title, children, category, fetch}) => {
    const {api} = useAppContext();

    const request = async (values: any) => {
        if (category) {
            await api.user.put(`director-franchise/category/${category.id}`, values);
            message.success("Вы успешно изменили категорию!");
        } else {
            await api.user.post(`director-franchise/category`, values);
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