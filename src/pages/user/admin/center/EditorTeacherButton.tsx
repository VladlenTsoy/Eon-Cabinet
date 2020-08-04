import React from "react";
import {message} from "antd";
import usingDrawerEditor from "../../../../lib/layouts/drawer-editor/usingDrawerEditor";
import FormEditorTeacherItems from "../../../../lib/layouts/drawer-editor/editor-teacher/FormEditorTeacherItems";
import {useAppContext} from "../../../../store/context/use-app-context";

const EditorButton = usingDrawerEditor(FormEditorTeacherItems);

interface EditorTeacherButtonProps {
    title: string;
    teacher?: any;
    fetch: any;
    franchise_id: any;
    center_id: any;
}

const EditorTeacherButton: React.FC<EditorTeacherButtonProps> = ({title, children, teacher, fetch, franchise_id, center_id}) => {
    const {api} = useAppContext();

    const request = async (values: any) => {
        if (teacher) {
            await api.user.post(`admin/teacher/${teacher.id}`, values);
            message.success("Вы успешно изменили данные учителя!");
        } else {
            await api.user.post(`admin/teacher`, values);
            message.success("Вы успешно добавили учителя!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        franchise_id={franchise_id}
        data={teacher ? {
            center_id:Number(center_id),
            status: teacher.status,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            email: teacher.email,
            phone: teacher.email,
            login: teacher.login,
            data_of_birth: teacher.data_of_birth,
        } : {
            center_id:Number(center_id),
            status: 'test',
        }}
    >
        {children}
    </EditorButton>
};

export default EditorTeacherButton;