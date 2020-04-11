import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import ItemBlock from "../../../director-franchise/layouts/items/ItemBlock";
import ItemDelete from "../../../director-franchise/layouts/items/ItemDelete";
import EditorTeacherButton from "../EditorTeacherButton";
import ChangeCenterTeacherItem from "./change-center/ChangeCenterTeacherItem";
import {ModalMenu} from "lib";

interface TeacherTableMenuProps {
    record: any,
    fetch: any,
    franchise_id: any,
    center_id: any,
}

const TeacherTableDropdown: React.FC<TeacherTableMenuProps> = ({record, fetch, franchise_id, center_id}) => {
    return (
        <ModalMenu>
            <EditorTeacherButton
                title="Редактировать учителя"
                fetch={fetch}
                franchise_id={franchise_id}
                center_id={center_id}
                teacher={record}>
                <EditOutlined /> Редактировать
            </EditorTeacherButton>
            <ChangeCenterTeacherItem teacher={record} afterAction={fetch}/>
            <ItemBlock user={record} afterAction={fetch}/>
            <ItemDelete user={record} afterAction={fetch}/>
        </ModalMenu>
    );
};

export default TeacherTableDropdown;