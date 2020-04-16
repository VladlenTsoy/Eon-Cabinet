import React from 'react';
import {PlusOutlined} from "@ant-design/icons";
import EditorButton from "./editor-button/EditorButton";
import SentHomeworkStudentButton from "./sent-homework-button/SentHomeworkStudentButton";
import DeleteStudentButton from "./delete-student-button/DeleteStudentButton";
import {Navigation, NavigationButton} from "layouts/components";
import SentCustomExercisesButton from "./sent-custom-exercises-button/SentCustomExercisesButton";

interface NavigationProps {
    fetchUsers: () => void;
    groupId: string;
    isVisible?: boolean;
    isVisibleCustomExercises?: boolean;
    selectUsersId: number[];
}

const GroupNavigation: React.FC<NavigationProps> = (
    {
        fetchUsers,
        groupId,
        selectUsersId,
        isVisible= false,
        isVisibleCustomExercises = false
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
        <SentCustomExercisesButton
            isVisible={isVisibleCustomExercises}
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