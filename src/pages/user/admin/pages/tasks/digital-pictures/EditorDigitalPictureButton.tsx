import React from "react";
import DigitalPictureItems from "./DigitalPictureItems";
import {message} from "antd";
import usingModalEditor from "../../../../../../lib/layouts/modal-editor/usingModalEditor";

const EditorButton = usingModalEditor(DigitalPictureItems);

interface EditorDigitalPictureButtonProps {
    title: string;
    digitalPicture?: any;
    fetch: any;
}

// TODO - api
const EditorDigitalPictureButton: React.FC<EditorDigitalPictureButtonProps> = ({title, children, digitalPicture, fetch}) => {

    const request = async (values: any) => {
        if (digitalPicture) {
            // await api.user.post(`admin/digital-picture/${digitalPicture.id}`, values);
            message.success("Вы успешно изменили Цифру-Картинку!");
        } else {
            // await api.user.post(`admin/digital-picture`, values);
            message.success("Вы успешно добавили Цифру-Картинку!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        data={digitalPicture ? {
            number: digitalPicture.number,
            picture: digitalPicture.url_picture,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorDigitalPictureButton;