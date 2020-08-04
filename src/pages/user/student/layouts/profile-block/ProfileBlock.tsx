import React from 'react';
import styled from "styled-components";
import Avatar from "../../../../../lib/components/avatar/Avatar";

const ProfileDetailsWrapper:any = styled.div`
    display: flex;
    align-items: center;
    
    @media (max-width: 480px) {
      display: grid;
      grid-gap: 1rem;
      justify-content: center;
      text-align: center;
      
      > div {
        margin: 0 auto;
      }
    }

    .profile-info{
      margin-left: 1rem;
      
      @media (max-width: 480px) {
        margin-left: 0;
      }
      
      .access{
        color: ${props => props.theme.color_second};
        margin: 0;
      }
      
      .title{
        font-size: 20px;
        font-weight: bolder;  
        margin-bottom: 0;
      }      
    
      .level{
        color: ${props => props.theme.color_second};
        margin-bottom: 0;
        
        .level-int{
          color: ${props => props.theme.color_primary};
        }
      }
    }
`;

interface ProfileBlockProps {
    user: any;
    teacher?: boolean;
}

const ProfileBlock: React.FC<ProfileBlockProps> = ({user, teacher}) => {
    return <ProfileDetailsWrapper className="profile-block">
            <Avatar src={user.image} alt={user.first_name} width="75px"/>
            <div className="profile-info">
                {teacher ? <p className="access">Учитель</p> : null}
                <p className="title">{user.first_name} {user.last_name}</p>
                {!teacher ? <p className="level">Уровень: <span className="level-int">{user.data.level}</span></p> : null}
            </div>
        </ProfileDetailsWrapper>;
};

export default ProfileBlock;