import React from "react";
import {useSelector} from "react-redux";
import {message} from "antd";
import usingModalEditor from "../../../../../../layouts/modal-editor/usingModalEditor";
import FormEditorGroupItems from "../../../../../../layouts/modal-editor/editor-group/FormEditorGroupItems";

const EditorButton = usingModalEditor(FormEditorGroupItems);

interface EditorGroupButtonProps {
    title: string;
    fetch: any;
    group?: any;
}

const EditorGroupButton: React.FC<EditorGroupButtonProps> = ({title, children, group, fetch}) => {
    const {api} = useSelector((state: any) => (state));
    const request = async (values: any) => {
        if (group) {
            await api.user_general.put(`teacher/group/${group.id}`, values);
            message.success("Вы успешно изменили группу!");
        } else {
            await api.user_general.post(`teacher/group`, values);
            message.success("Вы успешно добавили группу!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        data={group ? {
            title: group.title,
            method_id: String(group.method_id) || undefined,
            category_id: String(group.category_id) || undefined,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorGroupButton;