import React from "react";
import CenterItems from "../../../../../layouts/drawer-editor/editor-center/FormEditorCenterItems";
import {message} from "antd";
import {useSelector} from "react-redux";
import usingDrawerEditor from "../../../../../layouts/drawer-editor/usingDrawerEditor";

const EditorButton = usingDrawerEditor(CenterItems);

interface EditorCenterButtonProps {
    title: string;
    franchise_id: any;
    isMouseDown?: any;
    center?: any;
    fetch: any;
}

const EditorCenterButton: React.FC<EditorCenterButtonProps> = ({title, children, center, fetch, franchise_id, isMouseDown}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (center) {
            await api.user_general.post(`admin/center/${center.id}`, values);
            message.success("Вы успешно изменили центр!");
        } else {
            await api.user_general.post(`admin/center`, values);
            message.success("Вы успешно добавили центр!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        isMouseDown={isMouseDown}
        data={center ? {
            franchise_id: Number(franchise_id),
            title: center.title,
            description: center.description || undefined,
            phone: center.phone || undefined,
            address: center.address || undefined,
            city_id: center.city_id || undefined,
            image: center.image ? center.url_image : undefined,
        } : {
            franchise_id: Number(franchise_id)
        }}
    >
        {children}
    </EditorButton>
};

export default EditorCenterButton;