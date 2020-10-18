import React, {useState} from "react"
import styled from "styled-components"
import {CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined} from "@ant-design/icons"
import {Drawer, confirm} from "lib/ui"
import More from "./more/More"
import {cancelStudentHomework} from "../../../../../../../../../../../store/access/teacher/student-homework/cancelStudentHomework"
import {useDispatch} from "react-redux"
import {useParams} from "react-router-dom"
import {ParamsProps} from "../../../../../Group"
import {fetchStudentsHomeworkDates} from "../../../../../../../../../../../store/access/teacher/student-homework/fetchStudentsHomeworkDates"
import {StudentSentHomework} from "../../../../../../../../../../../lib/types/teacher/StudentHomework"

interface HomeworkBadgeStyledProps extends React.HTMLAttributes<HTMLDivElement> {
    status: "completing" | "completed" | "failed"
}

const HomeworkBadgeStyled: React.FC<HomeworkBadgeStyledProps> = styled.div<HomeworkBadgeStyledProps>`
    display: grid;
    grid-template-columns: ${props => (props.status === "completing" ? "30px 1fr 30px" : "30px 1fr")};
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 7px 7px 0 rgb(0 0 0 / 5%);
    margin: 0.25rem 0.25rem 0.5rem;

    :first-child {
        margin-top: 0.5rem;
    }

    > div {
        height: 100%;
        background: ${props => props.theme["@component-background"]};
        padding: 0.25rem 0.5rem;
    }

    .icon {
        background: ${props =>
            props.status === "completing" ? props.theme.color_warning : props.theme.color_success};
        color: #ffffff;
    }

    .title {
        position: relative;
        z-index: 1;

        .secondary {
            color: ${props => props.theme.color_second};
        }

        .level {
            margin: 0 0.25rem;
        }

        ::before {
            content: "";
            transition: all 0.15s ease-in-out;
            background: ${props =>
                props.status === "completing" ? props.theme.color_warning : props.theme.color_success};
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 100%;
            z-index: -1;
        }
    }

    .cancel {
        color: ${props => props.theme.color_second};

        :hover {
            .anticon {
                transition: transform 0.2s ease-in-out;
                transform: scale(1.2);
            }
        }
    }

    :hover {
        .title {
            color: #ffffff;

            > span {
                color: #ffffff;
            }

            ::before {
                right: 0;
            }
        }

        .cancel {
            color: ${props => props.theme.color_danger};
        }
    }
`

interface HomeworkBadgeProps {
    homework: StudentSentHomework
}

const HomeworkBadge: React.FC<HomeworkBadgeProps> = ({homework}) => {
    const {id} = useParams<ParamsProps>()
    const [moreVisible, setMoreVisible] = useState(false)
    const dispatch = useDispatch()
    const openMore = () => setMoreVisible(true)
    const closeMore = () => setMoreVisible(false)

    const cancelHomeworkHandler = () => {
        confirm({
            title: `Отменить отправку домашнего задания (Уровень: ${homework.homework.level}) ?`,
            async onOk() {
                await dispatch(cancelStudentHomework(homework.id))
                await dispatch(fetchStudentsHomeworkDates({groupId: Number(id), force: true}))
            },
            okText: 'Да',
            cancelText: 'Нет',
        })
    }

    return (
        <>
            <HomeworkBadgeStyled
                className="homework-badge"
                status={homework.status === 1 ? "completed" : "completing"}
            >
                <div className="icon">
                    {homework.status === 1 ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                </div>
                <div className="title" onClick={openMore}>
                    <span className="secondary">Уровень:</span>
                    <span className="level">{homework.homework.level}</span>
                    <span className="secondary">
                        ({homework.count_success}/{homework.count_all})
                    </span>
                </div>
                {homework.status === 0 && (
                    <div className="cancel" onClick={cancelHomeworkHandler}>
                        <DeleteOutlined />
                    </div>
                )}
            </HomeworkBadgeStyled>
            <Drawer
                title={`Уровень: ${homework.homework.level}`}
                visible={moreVisible}
                onClose={closeMore}
                width="100%"
            >
                <More homework={homework} />
            </Drawer>
        </>
    )
}

export default React.memo(HomeworkBadge)
