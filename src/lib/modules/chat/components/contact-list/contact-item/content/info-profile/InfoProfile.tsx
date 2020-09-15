import React from "react"
import styled from "styled-components"
import {Chat} from "../../../../../interfaces/Chat"
import moment from "moment"
import {Tag} from "antd"
import {useHistory} from "react-router-dom"

const InfoProfileStyled = styled.div`
    position: relative;
    color: ${(props) => props.theme.color_black};
    align-items: center;
    display: flex;
    white-space: nowrap;

    .full_name {
        text-overflow: ellipsis;
        overflow: hidden;
        margin-right: 0.5rem;

        span:first-child {
            margin-right: 0.25rem;
        }
    }

    .tags {
        margin-right: 0.25rem;
        font-size: 10px;

        > span {
            cursor: pointer;
            line-height: 1.2;
            border: 0;
        }
    }

    .time {
        margin-left: auto;
        font-size: 12px;
        color: ${(props) => props.theme.color_second};
    }
`

interface InfoProfileProps {
    chat: Chat
}

const InfoProfile: React.FC<InfoProfileProps> = ({chat}) => {
    const history = useHistory()

    const openUser = () => history.push(`/groups/${chat.contact.group?.id}/student/${chat.contact.id}`)
    const openGroup = () => history.push(`/groups/${chat.contact.group?.id}`)

    return (
        <InfoProfileStyled>
            <div className="full_name">
                <span>{chat.contact.last_name}</span>
                <span>{chat.contact.first_name}</span>
            </div>
            {chat.contact.access === 'student' && chat.contact?.group && (
                <div className="tags">
                    <Tag onClick={openUser}>ID: {chat.contact.id}</Tag>
                    <Tag onClick={openGroup}>{chat.contact.group.title}</Tag>
                </div>
            )}
            <div className="time">
                {chat.last_message &&
                    moment(chat.last_message.created_at).format("DD MMM HH:mm")}
            </div>
        </InfoProfileStyled>
    )
}

export default InfoProfile
