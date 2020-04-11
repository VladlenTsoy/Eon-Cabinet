import React from "react";
import {message} from "antd";
import {useSelector} from "react-redux";
import usingDrawerEditor from "../../../../layouts/drawer-editor/usingDrawerEditor";
import FormEditorTeacherItems from "../../../../layouts/drawer-editor/editor-teacher/FormEditorTeacherItems";

const EditorButton = usingDrawerEditor(FormEditorTeacherItems);

interface EditorTeacherButtonProps {
    title: string;
    teacher?: any;
    fetch: any;
    franchise_id: any;
    center_id: any;
}

const EditorTeacherButton: React.FC<EditorTeacherButtonProps> = ({title, children, teacher, fetch, franchise_id, center_id}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (teacher) {
            await api.user_general.post(`admin/teacher/${teacher.id}`, values);
            message.success("Вы успешно изменили данные учителя!");
        } else {
            await api.user_general.post(`admin/teacher`, values);
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