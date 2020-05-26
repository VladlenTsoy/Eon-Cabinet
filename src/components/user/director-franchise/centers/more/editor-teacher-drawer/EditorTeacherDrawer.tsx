import React from 'react';
import {useSelector} from "react-redux";
import {message} from "antd";
import usingDrawerEditorNew from "../../../../../../layouts/drawer-editor/usingDrawerEditor.new";
import TeacherItems from "./items/TeacherItems";
import {useScreenWindow} from "../../../../../../effects/use-screen-window.effect";

const FormComponentData = usingDrawerEditorNew(TeacherItems);

interface EditorDirectorDrawerProps {
    teacher?: any;
    center_id?: string;
    fetch: (pagination: any) => void;
    pagination?: any;
}

const EditorTeacherDrawer: React.FC<EditorDirectorDrawerProps> = (
    {
        teacher,
        children,
        center_id,
        pagination,
        fetch
    }
) => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (teacher) {
            await api.user.post(`director-franchise/teacher/${teacher.id}`, values);
            message.success("Вы успешно изменили данные учителя!");
        } else {
            await api.user.post(`director-franchise/teacher`, values);
            message.success("Вы успешно добавили учителя!");
        }
    };

    return <FormComponentData
        title={teacher ? 'Редактировать учителя' : 'Создать учителя'}
        sendData={request}
        fetch={fetch}
        width={isBreakpoint ? '100%' : 650}
        pagination={pagination}
        data={teacher ? {
            status: teacher.status,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            email: teacher.email,
            phone: teacher.phone,
            image: teacher.image,
            login: teacher.login,
            data_of_birth: teacher.data_of_birth,
            center_id: Number(teacher.center_id),
        } : {
            status: 'test',
            center_id: center_id ? Number(center_id) : null,
        }}
    >
        {children}
    </FormComponentData>
};

export default EditorTeacherDrawer;