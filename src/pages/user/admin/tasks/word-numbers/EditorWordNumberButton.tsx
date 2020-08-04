import React from "react";
import WordNumberItems from "./WordNumberItems";
import {message} from "antd";
import usingModalEditor from "../../../../../lib/layouts/modal-editor/usingModalEditor";
import {useAppContext} from "../../../../../store/context/use-app-context";

const EditorButton = usingModalEditor(WordNumberItems);

interface EditorWordNumberButtonProps {
    title: string;
    wordNumber?: any;
    fetch: any;
}

const EditorWordNumberButton: React.FC<EditorWordNumberButtonProps> = ({title, children, wordNumber, fetch}) => {
    const {api} = useAppContext();

    const request = async (values: any) => {
        if (wordNumber) {
            await api.user.post(`admin/word-number/${wordNumber.id}`, values);
            message.success("Вы успешно изменили Цифру-Слово!");
        } else {
            await api.user.post(`admin/word-number`, values);
            message.success("Вы успешно добавили Цифру-Слово!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        data={wordNumber ? {
            number: wordNumber.number,
            word: wordNumber.word,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorWordNumberButton;