import * as React from "react";
import {Typography} from "antd";
import {Card} from "lib/components";
import {useEffect, useState} from "react";
import PhotoBlock from "../../../../../lib/components/avatar/Photo";
import ProfileBlockMenu from "./menu/ProfileBlockMenu";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {updateUser} from "../../../../../store/common/user/updateUser";
import {useUser} from "../../../../../hooks/use-user";

const {Title} = Typography;

interface ProfileBlockProps {
    user: any;
    settingMenu: {
        color?: boolean;
        password?: boolean;
        email?: boolean;
        block?: boolean;
    }
}

const ProfileBlockWrapper = styled(Card)`
  text-align: center;

  .title {
    margin-bottom: 1rem;
  }
`;

const ProfileBlock: React.FC<ProfileBlockProps> = ({user: userData, settingMenu}) => {
    const [currentUser, setCurrentUser] = useState(userData)
    const {user} = useUser()
    const dispatch = useDispatch()

    useEffect(() => {
        setCurrentUser(user)
    }, [user])

    // Обновленные данные пользователя
    const changeDataCurrentUser = (updateDataUser: any) => {
        setCurrentUser(updateDataUser);
        if (updateDataUser.id === user.detail?.id)
            dispatch(updateUser(updateDataUser));
    };

    return <ProfileBlockWrapper>
        <PhotoBlock/>
        <Title className="title" level={3}>{currentUser.first_name} {currentUser.last_name}</Title>
        <ProfileBlockMenu
            currentUser={currentUser}
            changeDataCurrentUser={changeDataCurrentUser}
            setting={settingMenu}
        />
    </ProfileBlockWrapper>
};

export default ProfileBlock;