import React from 'react';
import {ModalMenu} from "lib/components";
import DeleteCenterItem from "./delete-center-item/DeleteCenterItem";
import EditorCenterDrawer from "../editor-center-drawer/EditorCenterDrawer";
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";

interface CenterModalMenuProps {
    fetch: any,
    pagination: any,
    center: any,
}

const CenterModalMenu: React.FC<CenterModalMenuProps> = ({fetch, pagination, center}) => {
    return (
        <ModalMenu>
            <Link to={`/centers/${center.id}`}>
                <InfoCircleOutlined /> Подробнее
            </Link>
            <EditorCenterDrawer fetch={fetch} center={center} pagination={pagination}>
                <EditOutlined /> Редактировать
            </EditorCenterDrawer>
            <DeleteCenterItem center={center} fetch={fetch}/>
        </ModalMenu>
    );
};

export default CenterModalMenu;