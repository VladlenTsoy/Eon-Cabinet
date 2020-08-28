import React from "react";
import {Modal} from "lib/ui/index";
import {ModalProps} from "antd/es/modal";

type ModalEditor = ModalProps & {
    width?: number;
}

const ModalEditor: React.FC<ModalEditor> = (
    {
        children,
        width,
        ...props
    }
) => {
    return <>
        <Modal
            className="form-modal"
            centered
            width={width || 300}
            cancelButtonProps={{hidden: true}}
            okButtonProps={{hidden: true}}
            {...props}
        >
            {children}
        </Modal>
    </>
};

export default ModalEditor;