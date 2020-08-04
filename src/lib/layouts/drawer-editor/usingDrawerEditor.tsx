import React, {useCallback, useState} from "react";
import DrawerEditor from "./DrawerEditor";
import usingFormDrawerEditorData from "./DrawerEditorData";

interface HookDrawerEditorProps {
    title: any;
    fetch: any;
    data?: any;
    width?: any;
    isMouseDown?: boolean;
    center_id?: string;
    disciplineId?: string;
    franchise_id?: string;
    isFranchise?: boolean;
    group_id?: string;
    sendData?: any;
    isVisible?: boolean;
}

const usingDrawerEditor = (FormComponent: any): React.FC<HookDrawerEditorProps> => {
    const FormComponentData = usingFormDrawerEditorData(FormComponent);
    return (
        {
            title,
            isVisible = false,
            fetch,
            children,
            data,
            sendData,
            isMouseDown,
            width,
            ...props
        }
    ) => {
        const [visible, setVisible] = useState<boolean>(isVisible);

        const open = () =>
            setVisible(true);

        const close = useCallback(async (e: any, isFetch?: boolean) => {
            setVisible(false);

            if (isFetch)
                fetch();
        }, [fetch]);

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

export default usingDrawerEditor;