import React from "react"
import styled from "styled-components"
import {Link} from "react-router-dom"
import {Typography} from "antd"
import {TextProps} from "antd/es/typography/Text"
import Avatar from "../../../../../ui/avatar/Avatar"
import {useUser} from "../../../../../../hooks/use-user"

const {Text} = Typography

const ProfileWrapper = styled(Link)<any>`
    color: ${(props) => props.theme.color_main};
    display: flex;
    align-items: center;
    margin-right: ${(props: any) => props.mr || "0.5rem"};
`

const WrapperProfileData = styled.div`
    overflow: hidden;
    margin-left: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const UserName: React.FC<TextProps> = styled(Text)`
    display: block;
    line-height: initial;
`

const UserId: React.FC<TextProps> = styled(Text)`
    font-weight: bolder;
    font-size: 80%;
    line-height: initial;

    span {
        color: ${(props) => props.theme.color_warning};
    }
`

interface HeaderProfileProps {
    mr?: string
}

const HeaderProfile: React.FC<HeaderProfileProps> = ({mr}) => {
    const {user} = useUser()

    return (
        <ProfileWrapper to="/profile" mr={mr}>
            <Avatar
                src={user.image}
                alt={`${user.last_name} ${user.first_name}`}
            />
            <WrapperProfileData>
                <UserName>
                    {user.last_name} {user.first_name}
                </UserName>
                <UserId type="secondary">
                    Ваш ID: <span>{user.id}</span>
                </UserId>
            </WrapperProfileData>
        </ProfileWrapper>
    )
}

export default HeaderProfile
