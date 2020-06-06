import React from 'react';
import {PlusOutlined} from "@ant-design/icons";
import EditorButton from "./editor-button/EditorButton";
import SentHomeworkStudentButton from "./sent-homework-button/SentHomeworkStudentButton";
import DeleteStudentButton from "./delete-student-button/DeleteStudentButton";
import {Navigation, NavigationButton} from "lib";

interface NavigationProps {
    fetchUsers: () => void;
    groupId: string;
    isVisible?: boolean;
    selectUsersId: number[];
}

const GroupNavigation: React.FC<NavigationProps> = (
    {
        fetchUsers,
        groupId,
        selectUsersId,
        isVisible= false,
    }
) => {
    return <Navigation>
        <EditorButton
            title="Создать ученика"
            group_id={groupId}
            fetch={fetchUsers}
        >
            <NavigationButton type="primary" icon={<PlusOutlined/>}>
                Создать ученика
            </NavigationButton>
        </EditorButton>
        <SentHomeworkStudentButton
            isVisible={isVisible}
            selectUsersId={selectUsersId}
            group_id={groupId}
            fetch={fetchUsers}
        />
        <DeleteStudentButton
            fetch={(fetchUsers)}
            selectUsersId={selectUsersId}
        />
    </Navigation>;
};

export default GroupNavigation;