import React from 'react';
import {useAppContext} from "store/context/use-app-context";
import ProfileBlock from "../../../layouts/profile-block/ProfileBlock";
import {Card} from "lib";
import Awards from "./awards/Awards";
import styled from "styled-components";

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
    const {user} = useAppContext();
    return <ProfileCardWrapper>
        <ProfileBlock user={user}/>
        <Awards/>
    </ProfileCardWrapper>;
};

export default Profile;