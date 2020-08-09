import React from "react";
import PersonalityItems from "./PersonalityItems";
import usingDrawerEditor from "../../../../../lib/layouts/drawer-editor/usingDrawerEditor";
import {message} from "antd";
import moment from 'moment';

const EditorButton = usingDrawerEditor(PersonalityItems);

interface EditorPersonalityButtonProps {
    title: string;
    personality?: any;
    fetch: any;
}

// TODO - api
const EditorPersonalityButton: React.FC<EditorPersonalityButtonProps> = ({title, children, personality, fetch}) => {
    const request = async (values: any) => {
        if (personality) {
            // await api.user.post(`admin/personality/${personality.id}`, values);
            message.success("Вы успешно изменили личность!");
        } else {
            // await api.user.post(`admin/personality`, values);
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