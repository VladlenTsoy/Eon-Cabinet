import React from "react";
import PersonalityItems from "./PersonalityItems";
import usingDrawerEditor from "../../../../../layouts/drawer-editor/usingDrawerEditor";
import {message} from "antd";
import {useSelector} from "react-redux";
import moment from 'moment';

const EditorButton = usingDrawerEditor(PersonalityItems);

interface EditorPersonalityButtonProps {
    title: string;
    personality?: any;
    fetch: any;
}

const EditorPersonalityButton: React.FC<EditorPersonalityButtonProps> = ({title, children, personality, fetch}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (personality) {
            await api.user_general.post(`admin/personality/${personality.id}`, values);
            message.success("Вы успешно изменили личность!");
        } else {
            await api.user_general.post(`admin/personality`, values);
            message.success("Вы успешно добавили личность!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        data={personality ? {
            full_name: personality.full_name,
            description: personality.description,
            photo: personality.url_photo,
            born: personality.born ? moment(personality.born, 'YYYY-MM-DD') : null,
            die: personality.die ? moment(personality.die, 'YYYY-MM-DD') : null,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorPersonalityButton;