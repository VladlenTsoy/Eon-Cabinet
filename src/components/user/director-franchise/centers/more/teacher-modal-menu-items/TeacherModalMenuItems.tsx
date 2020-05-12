import React from 'react';
import {ModalMenu} from "lib";
import { EditOutlined } from '@ant-design/icons';
import ItemBlock from "../../../layouts/items/ItemBlock";
import ItemDelete from "../../../layouts/items/ItemDelete";
import EditorTeacherDrawer from "../editor-teacher-drawer/EditorTeacherDrawer";

interface TeacherModalMenuItemsProps {
    record: any;
    fetch: any;
    centerId?: any;
    pagination: any;
}

const TeacherModalMenuItems: React.FC<TeacherModalMenuItemsProps> = ({record, fetch, pagination, centerId}) => {
    return <>
        <ModalMenu>
            <EditorTeacherDrawer
                teacher={record}
                fetch={fetch}
                pagination={pagination}
                center_id={centerId}
            >
                <EditOutlined /> Редактировать
            </EditorTeacherDrawer>
            <ItemBlock user={record} afterAction={fetch}/>
            <ItemDelete user={record} afterAction={fetch}/>
        </ModalMenu>
    </>;
};

export default TeacherModalMenuItems;