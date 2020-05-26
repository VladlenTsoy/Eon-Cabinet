import React from "react";
import WordItems from "./WordItems";
import {message} from "antd";
import {useSelector} from "react-redux";
import usingModalEditor from "../../../../../layouts/modal-editor/usingModalEditor";

const EditorButton = usingModalEditor(WordItems);

interface EditorWordButtonProps {
    title: string;
    word?: any;
    fetch: any;
}

const EditorWordButton: React.FC<EditorWordButtonProps> = ({title, children, word, fetch}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (word) {
            await api.user.post(`admin/word/${word.id}`, values);
            message.success("Вы успешно изменили слово!");
        } else {
            await api.user.post(`admin/word`, values);
            message.success("Вы успешно добавили слово!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        data={word ? {
            word: word.word,
            type: word.type,
            level: word.level,
            description: word.description,
            lang_id: word.lang_id,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorWordButton;