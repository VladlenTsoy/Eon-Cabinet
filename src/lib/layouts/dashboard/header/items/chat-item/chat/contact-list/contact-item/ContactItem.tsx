import React from "react"
import styled from "styled-components"
import {useUser} from "hooks/use-user"
import {Avatar} from "lib/ui"

const ContactItemStyled = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: 50px 1fr;
    overflow: hidden;
    padding: 0.5rem 1rem;
    align-items: center;
    cursor: pointer;

    :hover {
        background: ${(props) => props.theme.color_hover_item};
    }

    .content {
        overflow: hidden;

        .full-name {
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
        }

        .last-message {
            color: ${(props) => props.theme.color_second};
            display: flex;

            p {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                width: 100%;
                margin-bottom: 0;

                .me {
                    color: ${(props) => props.theme.color_primary};
                    margin-right: 0.25rem;
                }
            }

            .notify-count {
                background: ${(props) => props.theme.gradient_primary};
                color: #ffffff;
                border-radius: 50%;
                margin-left: 0.5rem;
                padding: 0 7px;
            }
        }
    }
`

interface ContactItemProps {
    selectContact: (ContactItemProps: any) => void
}

const Contactitem: React.FC<ContactItemProps> = ({selectContact}) => {
    const {user} = useUser()
    const onClickHandler = () => selectContact(user)

    return (
        <ContactItemStyled onClick={onClickHandler}>
            <div>
                <Avatar src={user.image} width="50px" />
            </div>
            <div className="content">
                <div className="full-name">
                    <span>{user.last_name}</span>
                    <span>{user.first_name}</span>
                    <span className="time">12:58</span>
                </div>
                <div className="last-message">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Architecto beatae consequuntur culpa doloribus
                        eligendi expedita facilis, fugit nesciunt optio quas,
                        qui quo repudiandae sapiente sit soluta ut vitae?
                        Blanditiis, reiciendis.
                    </p>
                    <div className="notify-count">1</div>
                </div>
            </div>
        </ContactItemStyled>
    )
}

export default Contactitem
