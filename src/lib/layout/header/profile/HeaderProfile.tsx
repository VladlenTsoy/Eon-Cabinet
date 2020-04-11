import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import Avatar from "../../../../layouts/components/avatar/Avatar";

const ProfileWrapper = styled(Link)<any>`
  color: ${props => props.theme.color_main};
  display: flex;
  align-items: center;
  margin-right: ${(props: any) => props.mr || '0.5rem'};
`;

const WrapperProfileData = styled.div`
   height: 46px;
   overflow: hidden;
   margin-left: 0.5rem;
`;

const UserName = styled.span`
      display: block;
      height: 10px;
      line-height: 40px;
`;

const UserId = styled.span`
      font-weight: bolder;
      color: ${props => props.theme.color_minimal};
      font-size: 80%;

      span {
         color: #ff9800;
      }
`;

interface HeaderProfileProps {
    user: any;
    mr?: string;
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({user, mr}) =>
    <ProfileWrapper to="/profile" mr={mr}>
        <Avatar src={user.image} alt={`${user.last_name} ${user.first_name}`}/>
        <WrapperProfileData>
            <UserName>{user.last_name} {user.first_name}</UserName>
            <UserId>Ваш ID: <span>{user.id}</span></UserId>
        </WrapperProfileData>
    </ProfileWrapper>;

export default HeaderProfile;