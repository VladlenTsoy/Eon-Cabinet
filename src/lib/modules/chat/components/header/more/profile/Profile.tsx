import React from "react"
import {Avatar} from "../../../../../../ui"
import {Contact} from "../../../../interfaces/Contact"
import {useHistory} from "react-router-dom"
import styled from "styled-components"
import {Tag} from "antd"

const ProfileStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    
    .full-name-tags {
        display: flex;
        align-items: center;
        overflow: hidden;

        .full-name {
            margin-right: 0.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .tags {
            > span {
                cursor: pointer;
                border: 0;
            }
        }
    }
`

interface ProfileProps {
    contact: Contact
}

const Profile: React.FC<ProfileProps> = ({contact}) => {
    const history = useHistory()

    const openUser = () => history.push(`/groups/${contact.group?.id}/student/${contact.id}`)

    const openGroup = () => history.push(`/groups/${contact.group?.id}`)

    return (
        <ProfileStyled>
            <Avatar src={contact.image} mr="0.5rem" />
            <div className="full-name-tags">
                <div className="full-name">
                    {contact.last_name} {contact.first_name}
                </div>
                {contact.access === "student" && contact?.group && (
                    <div className="tags">
                        <Tag onClick={openUser}>ID: {contact.id}</Tag>
                        <Tag onClick={openGroup}>{contact.group.title}</Tag>
                    </div>
                )}
            </div>
        </ProfileStyled>
    )
}

export default React.memo(Profile)
