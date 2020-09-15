import React from "react"
import styled from "styled-components"
import {Chat} from "../../../../../interfaces/Chat"
import moment from "moment"
import {Tag} from "antd"

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
    chat: Chat
}

const InfoProfile: React.FC<InfoProfileProps> = ({chat}) => {
    return (
        <>
            <InfoProfileStyled>
                <span>{chat.contact.last_name}</span>
                <span>{chat.contact.first_name}</span>
                <span className="time">
                    {
                        chat.last_message &&
                        moment(chat.last_message.created_at).format("DD MMM HH:mm")
                    }
                </span>
            </InfoProfileStyled>
            {
                chat.contact?.group &&
                <div>
                    <Tag color="#f50">{chat.contact.id}</Tag>
                    <Tag color="#f50">{chat.contact.group.title}</Tag>
                </div>
            }
        </>
    )
}

export default InfoProfile
