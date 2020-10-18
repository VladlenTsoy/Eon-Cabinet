import React from "react";
import {Drawer} from "lib/ui/index";

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
        destroyOnClose={true}
        onClose={close}
        visible={visible}
    >
        {children}
    </Drawer>;
};

export default DrawerEditor;