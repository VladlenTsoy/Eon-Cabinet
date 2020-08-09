import React from 'react';
import ProfileBlock from "../../../layouts/profile-block/ProfileBlock";
import {Card} from "lib/components";
import Awards from "./awards/Awards";
import styled from "styled-components";
import {useUser} from "../../../../../../hooks/use-user";

const ProfileCardWrapper = styled(Card)`
  &.ant-card{
    .ant-card-body{
      display: flex;
      height: 100%;
      
      .profile-block{
        @media (max-width: 480px) {
          text-align: left;
          grid-gap: 1rem;
          grid-template-columns: 75px 1fr;
          
          > div {
            margin: 0;
          }
        }
      }
    }
  }
`;

const Profile: React.FC = () => {
    const {user} = useUser();
    return <ProfileCardWrapper>
        <ProfileBlock user={user}/>
        <Awards/>
    </ProfileCardWrapper>;
};

export default Profile;