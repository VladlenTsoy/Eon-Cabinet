import React from 'react';

import CenterItems from "../../../../../../layouts/drawer-editor/editor-center/FormEditorCenterItems";
import usingDrawerEditorNew from "../../../../../../layouts/drawer-editor/usingDrawerEditor.new";
import {message} from "antd";
import {useAppContext} from "../../../../../../store/context/use-app-context";

const EditorButton = usingDrawerEditorNew(CenterItems);

interface EditorCenterDrawerProps {
    center?: any;
    pagination?: any;
    fetch: any;
}

const EditorCenterDrawer: React.FC<EditorCenterDrawerProps> = (
    {
        pagination,
        fetch,
        center,
        children
    }
) => {
    const {api} = useAppContext();
    const request = async (values: any) => {
        if (center) {
            await api.user.post(`director-franchise/center/${center.id}`, values);
            message.success("Вы успешно изменили центр!");
        } else {
            await api.user.post(`director-franchise/center`, values);
            message.success("Вы успешно добавили центр!");
        }
    };

    return <EditorButton
        title={center ? 'Редактировать центр' : 'Создать центр'}
        pagination={pagination}
        fetch={fetch}
        sendData={request}
        data={center ? {
            title: center.title,
            description: center.description || undefined,
            phone: center.phone || undefined,
            address: center.address || undefined,
            city_id: center.city_id || undefined,
            image: center.image ? center.url_image : undefined,
        } : null}
    >
        {children}
    </EditorButton>;
};

export default EditorCenterDrawer;