import React, {useCallback, useState} from "react";
import FormItems from "./form-items/FormItems";
import {Modal} from "lib/ui";
import {Group} from "../../../../../../../../lib/types/teacher/Group";

interface EditorButtonProps {
    title: string;
    group?: Group;
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
    const close = useCallback(() => setVisible(false), []);

    return <>
        <span onClick={open}>
            {children}
        </span>
        <Modal
            width={300}
            title={title}
            visible={visible}
            onCancel={close}
        >
            <FormItems
                group={group}
                close={close}
            />
        </Modal>
    </>
};

export default EditorButton;