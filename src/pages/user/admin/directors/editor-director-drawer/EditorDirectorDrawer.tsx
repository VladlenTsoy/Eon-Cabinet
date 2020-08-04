import React from "react";
import DirectorItems from "./items/DirectorItems";
import {message} from "antd";
import usingDrawerEditorNew from "../../../../../lib/layouts/drawer-editor/usingDrawerEditor.new";
import {useAppContext} from "../../../../../store/context/use-app-context";

const FormComponentData = usingDrawerEditorNew(DirectorItems);

interface EditorDirectorDrawerProps {
    director?: any;
    fetch: (pagination: any) => void;
    pagination?: any;
}

const EditorDirectorDrawer: React.FC<EditorDirectorDrawerProps> = (
    {
        fetch,
        director,
        pagination,
        children
    }
) => {
    const {api} = useAppContext();

    const request = async (values: any) => {
        if (director) {
            await api.user.post(`admin/franchise-director/${director.id}`, values);
            message.success("Вы успешно изменили директора!");
        } else {
            await api.user.post(`admin/franchise-director`, values);
            message.success("Вы успешно добавили директора!");
        }
    };

    return <FormComponentData
        title={director ? 'Редактировать директора' : 'Создать директора'}
        sendData={request}
        fetch={fetch}
        pagination={pagination}
        data={director ? {
            first_name: director.first_name,
            last_name: director.last_name,
            email: director.email,
            phone: director.email,
            franchise_id: director.franchise_id,
            login: director.login,
            data_of_birth: director.data_of_birth,
        } : null}
    >
        {children}
    </FormComponentData>;
};

export default EditorDirectorDrawer;