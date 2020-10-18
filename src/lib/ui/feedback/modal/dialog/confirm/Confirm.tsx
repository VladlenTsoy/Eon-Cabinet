import React from "react"
import style from "./Confirm.module.css"
import Actions from "./actions/Actions"
import {CallDialogParamsProps} from "../callDialog"
import {QuestionCircleOutlined} from "@ant-design/icons"

interface ConfirmProps {
    title: string
    okLoading: boolean
    content?: React.ReactNode
    icon?: CallDialogParamsProps["icon"]
    okType?: CallDialogParamsProps["okType"]
    closeHandler: () => void
    okHandler?: () => void
    okText: CallDialogParamsProps["okText"]
    cancelText?: CallDialogParamsProps["cancelText"]
}

const Confirm: React.FC<ConfirmProps> = ({
    title,
    icon,
    okType = "primary",
    content,
    okHandler,
    closeHandler,
    cancelText,
    okText,
    okLoading
}) => {
    return (
        <div className={style.confirmCard}>
            <div>
                <div>
                    <div className={style.confirmContainerIcon}>{icon || <QuestionCircleOutlined />}</div>
                    <span className={style.confirmContainerTitle}>{title}</span>
                    <div className={style.confirmContainerContent}>{content}</div>
                </div>
                <Actions
                    okLoading={okLoading}
                    okText={okText}
                    okType={okType}
                    okHandler={okHandler}
                    closeHandler={closeHandler}
                    cancelText={cancelText}
                />
            </div>
        </div>
    )
}

export default Confirm
