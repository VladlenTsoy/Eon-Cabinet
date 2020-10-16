import React, {useEffect, useRef} from "react"
import style from "./Actions.module.css"
import {Button} from "../../index"
import {DialogParamsProps} from "../Dialog"

interface ActionsProps {
    okLoading: boolean
    okType?: DialogParamsProps["okType"]
    okHandler: DialogParamsProps["onOk"]
    closeHandler: DialogParamsProps["onOk"]
    okText: DialogParamsProps["okText"]
    cancelText?: DialogParamsProps["cancelText"]
}

const Actions: React.FC<ActionsProps> = ({
    okLoading,
    okType = "primary",
    closeHandler,
    okHandler,
    cancelText,
    okText
}) => {
    const okButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
            setTimeout(() => {
                if (okButtonRef.current)
                    okButtonRef.current.focus()
            })
    }, [okButtonRef.current])

    return (
        <div className={style.confirmActions}>
            {cancelText && (
                <Button onClick={closeHandler} disabled={okLoading}>
                    {cancelText}
                </Button>
            )}
            <Button type={okType} onClick={okHandler} loading={okLoading} ref={okButtonRef}>
                {okText}
            </Button>
        </div>
    )
}

export default Actions
