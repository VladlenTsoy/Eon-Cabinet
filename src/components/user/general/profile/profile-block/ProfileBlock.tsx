import * as React from "react";
import {Typography} from "antd";
import {Card} from "lib";
import {useEffect, useState} from "react";
import PhotoBlock from "../../../../../layouts/components/avatar/Photo";
import ProfileBlockMenu from "./menu/ProfileBlockMenu";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUserData} from "../../../../../store/reducers/common/user/actions";

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

const ProfileBlock: React.FC<ProfileBlockProps> = ({user, settingMenu}) => {
    const [currentUser, setCurrentUser] = useState(user);
    const thisUser = useSelector((state: any) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    // Обновленные данные пользователя
    const changeDataCurrentUser = (updateDataUser: any) => {
        setCurrentUser(updateDataUser);
        if (updateDataUser.id === thisUser.id)
            dispatch(setCurrentUserData(updateDataUser));
    };

    return <ProfileBlockWrapper>
        <PhotoBlock currentUser={currentUser} changeDataCurrentUser={changeDataCurrentUser}/>
        <Title className="title" level={3}>{currentUser.first_name} {currentUser.last_name}</Title>
        <ProfileBlockMenu
            currentUser={currentUser}
            changeDataCurrentUser={changeDataCurrentUser}
            setting={settingMenu}/>
    </ProfileBlockWrapper>
};

export default ProfileBlock;