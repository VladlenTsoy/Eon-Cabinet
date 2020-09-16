import React from 'react';
import {Card} from "lib/ui";
import ProfileBlock from "../../../../../student/layouts/_old/profile-block/ProfileBlock";
import ActionButtons from "./action-buttons/ActionButtons";
import styled from "styled-components";
import GroupCoins from "./group-coins/GroupCoins";
import {Student} from "../../../../../../../lib/types/teacher/Student";

const ProfileWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-gap: 1rem 1.5rem;
`;

interface ProfileProps {
    student: Student;
}

const Profile: React.FC<ProfileProps> = ({student}) => {
    return <Card>
        <ProfileWrapper>
            <ProfileBlock user={student}/>
            <GroupCoins student={student}/>
            <ActionButtons student={student}/>
        </ProfileWrapper>
    </Card>;
};

export default Profile;