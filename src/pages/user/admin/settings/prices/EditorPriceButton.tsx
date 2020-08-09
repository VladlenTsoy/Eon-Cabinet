import React from "react";
import PriceItems from "./PriceItems";
import {message} from "antd";
import usingModalEditor from "../../../../../lib/layouts/modal-editor/usingModalEditor";

const EditorButton = usingModalEditor(PriceItems);

interface EditorPriceButtonProps {
    title: string;
    price?: any;
    fetch: any;
    isMouseDown?: boolean;
}

// TODO - api
const EditorPriceButton: React.FC<EditorPriceButtonProps> = ({title, children, price, fetch, isMouseDown}) => {

    const request = async (values: any) => {
        if (price) {
            // await api.user.post(`admin/price/${price.id}`, values);
            message.success("Вы успешно изменили цену!");
        } else {
            // await api.user.post(`admin/price`, values);
            message.success("Вы успешно добавили цену!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        isMouseDown={isMouseDown}
        data={price ? {
            title: price.title,
            student: price.student,
            teacher: price.teacher,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorPriceButton;