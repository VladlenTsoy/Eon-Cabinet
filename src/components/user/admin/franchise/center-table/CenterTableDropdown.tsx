import React from "react";
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import EditorCenterButton from "./EditorCenterButton";
import {ModalMenu} from "lib";

interface CenterTableDropdownProps {
    center: any,
    fetch: any,
    franchise_id: any,
}

const CenterTableDropdown: React.FC<CenterTableDropdownProps> = ({center, fetch, franchise_id}) => {
    return (
        <ModalMenu>
            <Link to={`/franchises/${franchise_id}/centers/${center.id}`}>
                <InfoCircleOutlined /> Подробнее
            </Link>
            <EditorCenterButton
                title="Редактировать центр"
                fetch={fetch}
                center={center}
                franchise_id={franchise_id}>
                <EditOutlined /> Редактировать
            </EditorCenterButton>
        </ModalMenu>
    );
};

export default CenterTableDropdown;