import React from "react";
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import EditorFranchiseButton from "../EditorFranchiseButton";
import {ModalMenu} from "lib";

interface FranchiseTableDropdownProps {
    franchise: any,
    fetch: any,
}


const FranchiseTableDropdown: React.FC<FranchiseTableDropdownProps> = ({franchise, fetch}) => {
    return (
        <ModalMenu>
            <Link to={`/franchises/${franchise.id}`}>
                <InfoCircleOutlined /> Подробнее
            </Link>
            <EditorFranchiseButton title="Редактировать франшизу" fetch={fetch} franchise={franchise}>
                <EditOutlined /> Редактировать
            </EditorFranchiseButton>
        </ModalMenu>
    );
};

export default FranchiseTableDropdown;