import React, {useState} from "react";
import DrawerEditor from "./DrawerEditor";
import usingFormDrawerEditorData from "./DrawerEditorData";

interface HookDrawerEditorProps {
    title: any;
    fetch: any;
    pagination?: any;
    data?: any;
    width?: any;
    isMouseDown?: boolean;
    center_id?: string;
    disciplineId?: string;
    franchise_id?: string;
    isFranchise?: boolean;
    group_id?: string;
    sendData?: any;
}

const usingDrawerEditorNew = (FormComponent: any): React.FC<HookDrawerEditorProps> => {
    const FormComponentData = usingFormDrawerEditorData(FormComponent);
    return (
        {
            title,
            fetch,
            pagination,
            children,
            data,
            sendData,
            isMouseDown,
            width,
            ...props
        }
    ) => {
        const [visible, setVisible] = useState(false);

        const open = () => {
            setVisible(true);
        };

        const close = (e: any, isFetch?: boolean) => {
            if (isFetch)
                fetch(pagination);

            setVisible(false);
        };

        return <>
            <span
                onClick={isMouseDown ? () => null : open}
                onMouseDown={isMouseDown ? open : () => null}
            >
                {children}
            </span>
            <DrawerEditor visible={visible} close={close} title={title} width={width}>
                <FormComponentData close={close} data={data} {...props} sendData={sendData}/>
            </DrawerEditor>
        </>;
    };
};

export default usingDrawerEditorNew;