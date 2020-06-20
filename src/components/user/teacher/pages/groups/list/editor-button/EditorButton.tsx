import React, {useState} from "react";
import FormItems from "./form-items/FormItems";
import ModalEditor from "../../../../../../../layouts/modal-editor/ModalEditor";

interface EditorButtonProps {
    title: string;
    group?: any;
}

const EditorButton: React.FC<EditorButtonProps> = (
    {
        title,
        children,
        group,
    }
) => {
    const [visible, setVisible] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <span onClick={open}>
            {children}
        </span>
        <ModalEditor
            title={title}
            visible={visible}
            onCancel={close}
        >
            <FormItems
                group={group}
                close={close}
            />
        </ModalEditor>
    </>
};

export default EditorButton;