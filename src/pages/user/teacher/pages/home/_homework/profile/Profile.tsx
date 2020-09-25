import React from "react"
import {Avatar} from "../../../../../../../lib/ui"
import styled from "styled-components"

const ProfileStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const AvatarStyled = styled.div`
    margin-right: 0.5rem;
`

const FullNameStyled = styled.div`
    font-size: 14px;
`

const IdStyled = styled.div`
    font-size: 11px;
    color: ${(props) => props.theme.color_second};

    span {
        color: ${(props) => props.theme.color_warning};
    }
`

interface Profile {
    student: {
        id: number
        image: string
        first_name: string
        last_name: string
    }
}

const Profile = () => {
    return (
        <ProfileStyled>
            <AvatarStyled>
                <Avatar
                    src="http://192.168.1.37:8000/images/default.svg"
                    alt="name"
                    width="50px"
                />
            </AvatarStyled>
            <div>
                <FullNameStyled>Цой Владлен</FullNameStyled>
                <IdStyled>
                    ID: <span>2066</span>
                </IdStyled>
            </div>
        </ProfileStyled>
    )
}

export default Profile