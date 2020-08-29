import React from "react"
import styled from "styled-components"
import {Contact} from "../../../../../interfaces/Contact"

const InfoProfileStyled = styled.div`
    position: relative;
    color: ${(props) => props.theme.color_black};

    span:first-child {
        margin-right: 0.25rem;
    }

    .time {
        font-size: 12px;
        position: absolute;
        color: ${(props) => props.theme.color_second};
        right: 0;
    }
`

interface InfoProfileProps {
    profile: Contact['profile']
}

const InfoProfile: React.FC<InfoProfileProps> = ({profile}) => {
    return (
        <InfoProfileStyled>
            <span>{profile.last_name}</span>
            <span>{profile.first_name}</span>
            <span className="time">12:58</span>
        </InfoProfileStyled>
    )
}

export default InfoProfile
