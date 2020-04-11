import usingDrawerEditor from "../../../../../../../layouts/drawer-editor/usingDrawerEditor";
import StudentItems from "../../../../../../../layouts/drawer-editor/editor-student/FormEditorStudentItems";
import React from "react";
import {useSelector} from "react-redux";
import {message} from "antd";
import moment from 'moment';
import {useScreenWindow} from "../../../../../../../effects/use-screen-window.effect";

const EditorButton = usingDrawerEditor(StudentItems);

interface EditorStudentButtonProps {
    title: string;
    fetch: any;
    student?: any;
    group_id?: any;
}

const EditorStudentButton: React.FC<EditorStudentButtonProps> = ({title, children, student, fetch, group_id}) => {
    const {api} = useSelector((state: any) => (state));
    const [, breakpoint] = useScreenWindow({breakpoint: 'sm'});

    const request = async (values: any) => {
        if (student) {
            await api.user_general.post(`teacher/student/${student.id}`, values);
            message.success("Вы успешно изменили данные ученика!");
        } else {
            await api.user_general.post(`teacher/student`, values);
            message.success("Вы успешно добавили ученика!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        group_id={group_id}
        sendData={request}
        width={breakpoint ? '100%' : 650}
        data={student ? {
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            phone: student.phone,
            group_id: Number(student.group_id),
            date_of_birth: student.date_of_birth ? moment(student.date_of_birth, 'YYYY-MM-DD') : null,
            login: student.login,
            image: student.image,
        } : {
            group_id: Number(group_id)
        }}
    >
        {children}
    </EditorButton>
};

export default EditorStudentButton;