import React from 'react';
import {UserImage} from "../../../../../../../../layouts/components";
import styled from "styled-components";
import {Link} from "react-router-dom";

const UserNameWrapper = styled(Link)`
   display: flex;
   align-items: center;
   color: ${props => props.theme.color_main};

   &:hover{
     color: ${props => props.theme.color_primary};
   }
`;

interface ProfileColumnProps {
    student: any;
}

const ProfileColumn:React.FC<ProfileColumnProps> = ({student}) => {
    return <UserNameWrapper to={`/groups/${student.group_id}/student/${student.id}`}>
        <UserImage
            src={student.image}
            alt={`${student.last_name} ${student.first_name}`}
            width="50px"
            mr="0.75rem"/>
        {student.last_name} {student.first_name}
    </UserNameWrapper>;
};

export default ProfileColumn;