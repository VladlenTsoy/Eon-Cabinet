import React from "react";
import PriceItems from "./PriceItems";
import {message} from "antd";
import {useSelector} from "react-redux";
import usingModalEditor from "../../../../../layouts/modal-editor/usingModalEditor";

const EditorButton = usingModalEditor(PriceItems);

interface EditorPriceButtonProps {
    title: string;
    price?: any;
    fetch: any;
    isMouseDown?: boolean;
}

const EditorPriceButton: React.FC<EditorPriceButtonProps> = ({title, children, price, fetch, isMouseDown}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (price) {
            await api.user_general.post(`admin/price/${price.id}`, values);
            message.success("Вы успешно изменили цену!");
        } else {
            await api.user_general.post(`admin/price`, values);
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