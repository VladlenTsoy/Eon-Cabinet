import React from 'react';
import {PlusOutlined, SendOutlined} from "@ant-design/icons";
import {Navigation, NavigationButton} from "lib/components";
import EditorButton from "./editor-button/EditorButton";
import SentHomeworkStudentButton from "./sent-homework-button/SentHomeworkStudentButton";
import DeleteStudentButton from "./delete-student-button/DeleteStudentButton";

const NavButtons: React.FC = () => {
    return <Navigation>
        <EditorButton title="Создать ученика">
            <NavigationButton type="primary" icon={<PlusOutlined/>}>
                Создать ученика
            </NavigationButton>
        </EditorButton>
        <SentHomeworkStudentButton>
            <NavigationButton type="primary" icon={<SendOutlined/>}>
                Отправить домашнее задание
            </NavigationButton>
        </SentHomeworkStudentButton>
        <DeleteStudentButton/>
    </Navigation>;
};

export default React.memo(NavButtons);