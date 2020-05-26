import React from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Divider } from "antd";
import usingDrawerEditor from "../../../layouts/drawer-editor/usingDrawerEditor";
import FormEditorCenterItems from "../../../layouts/drawer-editor/editor-center/FormEditorCenterItems";

const CreateCenterButton = usingDrawerEditor(FormEditorCenterItems);

interface DropdownData {
    menu: any;
    update: any;
}

const DropdownData: React.FC<DropdownData> = ({menu, update}) => {
    return <>
        {menu}
        <Divider style={{margin: '4px 0'}}/>
        <div style={{padding: '8px', cursor: 'pointer'}}>
            <CreateCenterButton title="Создать центр" fetch={update} isMouseDown={true}>
                <PlusOutlined /> aaaaaaaa
            </CreateCenterButton>
        </div>
    </>;
};

export default DropdownData;