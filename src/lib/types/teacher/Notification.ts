import {ButtonType} from "antd/es/button";
import {AlertProps} from "antd/es/alert";

//
export interface QuickNotice {
    image: string
    title: string
    text: string
    link: {
        to: string
        type: ButtonType
        text: string
    }
}

//
export interface AlertNotice {
    type: AlertProps['type']
    title: string
    description: string
}