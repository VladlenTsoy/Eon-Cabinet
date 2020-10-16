import * as React from "react"
import {ExclamationCircleOutlined} from "@ant-design/icons"
import {DialogParamsProps, Digital} from "../lib/ui/modal-confirm/Dialog"

type MessageProps = (params: DialogParamsProps) => Promise<boolean>

export const confirm: MessageProps = async (props) => {
    return await Digital(props)
}

export interface WarningParamsProps {
    title: string
    content?: React.ReactNode
    okText: string
}

type WarningProps = (params: WarningParamsProps) => Promise<boolean>

export const warning: WarningProps = async ({title, content, okText}) => {
    return await Digital({
        title,
        content,
        okText,
        icon: <ExclamationCircleOutlined/>
    })
}
