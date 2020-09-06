import React from "react"
import styled from "styled-components"
import {Contact} from "../../../../../interfaces/Contact"
import moment from "moment"

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
    contact: Contact
}

const InfoProfile: React.FC<InfoProfileProps> = ({contact}) => {
    return (
        <InfoProfileStyled>
            <span>{contact.last_name}</span>
            <span>{contact.first_name}</span>
            <span className="time">
                {
                    contact.messages?.last &&
                    moment(contact.messages.last.created_at * 1000).format("DD MMM HH:mm")
                }
            </span>
        </InfoProfileStyled>
    )
}

export default InfoProfile
