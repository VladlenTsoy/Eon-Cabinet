import React from 'react';
import {Card} from "lib/components";
import ProfileBlock from "../../../../../student/layouts/profile-block/ProfileBlock";
import ActionButtons from "./action-buttons/ActionButtons";
import styled from "styled-components";
import GroupCoins from "./group-coins/GroupCoins";

const ProfileWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-gap: 1rem 1.5rem;
`;

interface ProfileProps {
    student: any;
    update: () => void;
}

const Profile: React.FC<ProfileProps> = ({student, update}) => {
    return <Card>
        <ProfileWrapper>
            <ProfileBlock user={student}/>
            <GroupCoins student={student}/>
            <ActionButtons student={student} update={update}/>
        </ProfileWrapper>
    </Card>;
};

export default Profile;