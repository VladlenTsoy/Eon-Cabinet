import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import ItemBlock from "../../../director-franchise/layouts/items/ItemBlock";
import ItemDelete from "../../../director-franchise/layouts/items/ItemDelete";
import {ModalMenu} from "lib/components";
import EditorDirectorDrawer from "../editor-director-drawer/EditorDirectorDrawer";

interface ModalMenuItemsProps {
    record: any;
    fetch: () => void;
    pagination: any;
}

const DirectorModalMenuItems: React.FC<ModalMenuItemsProps> = ({record, fetch, pagination}) => {
    return (
        <ModalMenu>
            <EditorDirectorDrawer director={record} fetch={fetch} pagination={pagination}>
                <EditOutlined /> Редактировать
            </EditorDirectorDrawer>
            <ItemBlock user={record}/>
            <ItemDelete user={record} afterAction={fetch}/>
        </ModalMenu>
    );
};

export default DirectorModalMenuItems;