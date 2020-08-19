import {ModalFunc} from "antd/es/modal/confirm";
import * as React from "react";
import {Modal} from "antd";

interface ParamsProps {
    title: string
    content?: React.ReactNode
    type?: 'info' | 'success' | 'error' | 'warning' | 'confirm'
    onOk?: (...args: any[]) => any
    onCancel?: (...args: any[]) => any
}

type MessageProps = (params: ParamsProps) => ModalFunc;

export const confirm: MessageProps = ({type = 'confirm'}) => {
    return Modal[type]
}