import React from "react";
import {Drawer} from "../components";

interface DrawerEditorProps {
    visible: boolean;
    close: any;
    title: any;
    width?: any;
}

const DrawerEditor: React.FC<DrawerEditorProps> = ({title, visible, close, width, children}) => {
    return <Drawer
        title={title}
        width={width || 650}
        closable={false}
        destroyOnClose={true}
        onClose={close}
        visible={visible}
    >
        {children}
    </Drawer>;
};

export default DrawerEditor;