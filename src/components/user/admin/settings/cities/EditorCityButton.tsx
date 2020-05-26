import React from "react";
import CityItems from "./CityItems";
import {message} from "antd";
import {useSelector} from "react-redux";
import usingModalEditor from "../../../../../layouts/modal-editor/usingModalEditor";

const EditorButton = usingModalEditor(CityItems);

interface EditorCountryButtonProps {
    title: string;
    city?: any;
    fetch: any;
}

const EditorCityButton: React.FC<EditorCountryButtonProps> = ({title, children, city, fetch}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (city) {
            await api.user.post(`admin/city/${city.id}`, values);
            message.success("Вы успешно изменили город!");
        } else {
            await api.user.post(`admin/city`, values);
            message.success("Вы успешно добавили город!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        data={city ? {
            title: city.title,
            lang_id: city.lang_id,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorCityButton;