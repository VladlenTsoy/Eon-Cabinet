import React, {useCallback, useState} from "react";
import {useScreenWindow} from "../../../../../../../../hooks/use-screen-window.effect";
import {Student} from "../../../../../../../../store/access/teacher/students/studentSlice";
import DrawerEditor from "../../../../../../../../lib/layouts/drawer-editor/DrawerEditor";
import FormItems from "./from-items/FormItems";
import moment from "moment";

interface EditorStudentButtonProps {
    title: string;
    student?: Student;
}

const EditorButton: React.FC<EditorStudentButtonProps> = ({title, children, student}) => {
    const [visible, setVisible] = useState(false);
    const [, breakpoint] = useScreenWindow({breakpoint: 'sm'});

    const open = () => setVisible(true);
    const close = useCallback(() => setVisible(false), []);

    return <>
        <span onClick={open}>
            {children}
        </span>
        <DrawerEditor
            visible={visible}
            close={close}
            title={title}
            width={breakpoint ? '100%' : 650}
        >
            <FormItems
                close={close}
                student={
                    student ? {
                        ...student,
                        date_of_birth: student.date_of_birth ? moment(student.date_of_birth, 'YYYY-MM-DD') : null
                    } : undefined
                }/>
        </DrawerEditor>
    </>;
};

export default EditorButton;