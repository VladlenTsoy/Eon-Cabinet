import React, {useState} from "react";
import ModalEditor from "./ModalEditor";
import usingFormEditorModalData from "./ModalEditorData";

interface HookModalEditorProps {
    title: any;
    fetch: any;
    data?: any;
    width?: any;
    sendData?: any;
    isMouseDown?: boolean;
    center_id?: string;
    franchise_id?: string;
    disciplineId?: string;
    isFranchise?: boolean;
}

const usingModalEditor = (FormComponent: any): React.FC<HookModalEditorProps> => {
    const FormComponentData = usingFormEditorModalData(FormComponent);

    return ({title, fetch, children, sendData, data, isMouseDown, width, ...props}) => {
        const [visible, setVisible] = useState(false);

        const open = () => {
            setVisible(true);
        };

        const close = async (e: any, isFetch?: boolean) => {
            setVisible(false);
            if (isFetch)
                await fetch();
        };

        return <>
            <span
                onClick={isMouseDown ? () => null : open}
                onMouseDown={isMouseDown ? open : () => null}
            >
                {children}
            </span>
            <ModalEditor visible={visible} close={close} title={title} width={width}>
                <FormComponentData close={close} sendData={sendData} data={data} {...props}/>
            </ModalEditor>
        </>;
    };
};

export default usingModalEditor;