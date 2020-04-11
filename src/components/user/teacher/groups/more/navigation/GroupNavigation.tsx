import React from 'react';
import EditorStudentButton from "./editor-student-button/EditorStudentButton";
import SentHomeworkStudentButton from "./sent-homework-button/SentHomeworkStudentButton";
import DeleteStudentButton from "./delete-student-button/DeleteStudentButton";
import {Navigation, NavigationButton} from "../../../../../../layouts/components";

interface NavigationProps {
    fetchUsers:() => void;
    groupId: string;
    isVisible?: boolean;
    selectUsersId: number[];
}

const GroupNavigation: React.FC<NavigationProps> = ({fetchUsers,groupId, selectUsersId, isVisible}) => {
    return <Navigation>
        <EditorStudentButton
            title="Создать ученика"
            group_id={groupId}
            fetch={fetchUsers}
        >
            <NavigationButton type="primary" icon="plus">
                Создать ученика
            </NavigationButton>
        </EditorStudentButton>
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