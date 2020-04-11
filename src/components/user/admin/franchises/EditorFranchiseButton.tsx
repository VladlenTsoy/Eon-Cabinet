import React from "react";
import FranchiseItems from "./FranchiseItems";
import {message} from "antd";
import {useSelector} from "react-redux";
import usingDrawerEditor from "../../../../layouts/drawer-editor/usingDrawerEditor";

const EditorButton = usingDrawerEditor(FranchiseItems);

interface EditorFranchiseButtonProps {
    title: string;
    franchise?: any;
    fetch: any;
}

const EditorFranchiseButton: React.FC<EditorFranchiseButtonProps> = ({title, children, franchise, fetch}) => {
    const {api} = useSelector((state: any) => (state));

    const request = async (values: any) => {
        if (franchise) {
            await api.user_general.post(`admin/franchise/${franchise.id}`, values);
            message.success("Вы успешно изменили франшизу!");
        } else {
            await api.user_general.post(`admin/franchise`, values);
            message.success("Вы успешно добавили франшизу!");
        }
    };

    return <EditorButton
        title={title}
        fetch={fetch}
        sendData={request}
        data={franchise ? {
            title: franchise.title,
            description: franchise.description || undefined,
            director_id: franchise.director_id || undefined,
            price_id: franchise.price.id || undefined,
            image: franchise.image ? franchise.url_image : undefined,
        } : null}
    >
        {children}
    </EditorButton>
};

export default EditorFranchiseButton;