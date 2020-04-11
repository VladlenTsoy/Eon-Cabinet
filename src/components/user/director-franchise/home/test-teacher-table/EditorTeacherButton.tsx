import React from 'react';
import usingDrawerEditor from "../../../../../layouts/drawer-editor/usingDrawerEditor";
import FormEditorTeacherItems from "../../../../../layouts/drawer-editor/editor-teacher/FormEditorTeacherItems";
import {useSelector} from "react-redux";
import {message} from "antd";

const EditorButton = usingDrawerEditor(FormEditorTeacherItems);

interface EditorTeacherButtonProps {
    title: string;
    teacher?: any;
    fetch: any;
    center_id?: number;
}

const EditorTeacherButton: React.FC<EditorTeacherButtonProps> = ({title, children, teacher, fetch, center_id}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (teacher) {
            await api.user_general.post(`director-franchise/teacher/${teacher.id}`, values);
            message.success("Вы успешно изменили данные учителя!");
        } else {
            await api.user_general.post(`director-franchise/teacher`, values);
            message.success("Вы успешно добавили учителя!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        data={teacher ? {
            status: teacher.status,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            email: teacher.email,
            phone: teacher.email,
            login: teacher.login,
            data_of_birth: teacher.data_of_birth,
            center_id: Number(teacher.center_id),
        } : {
            status: 'test',
            center_id: Number(center_id),
        }}
    >
        {children}
    </EditorButton>
};

export default EditorTeacherButton;