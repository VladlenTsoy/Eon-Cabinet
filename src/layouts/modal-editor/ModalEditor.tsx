import React from "react";
import {Modal} from "../components";

interface ModalEditor {
    title: string;
    destroyOnClose?: boolean;
    visible: boolean;
    close: any;
    width?: number;
}

const ModalEditor: React.FC<ModalEditor> = (
    {
        children,
        title,
        destroyOnClose = true,
        close,
        visible,
        width
    }
) => {
    return <>
        <Modal
            title={title}
            className="form-modal"
            centered
            destroyOnClose={destroyOnClose}
            width={width || 300}
            visible={visible}
            onCancel={close}
            cancelButtonProps={{hidden: true}}
            okButtonProps={{hidden: true}}
        >
            {children}
        </Modal>
    </>
};

export default ModalEditor;