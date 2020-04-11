import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import ItemBlock from "../../../director-franchise/layouts/items/ItemBlock";
import ItemDelete from "../../../director-franchise/layouts/items/ItemDelete";
import {ModalMenu} from "lib";

interface TeacherTableMenuProps {
    record: any,
    setLoader: any,
}

const TeacherModalMenu: React.FC<TeacherTableMenuProps> = ({record, setLoader}) => {
    return (
        <ModalMenu>
            <div>
                <InfoCircleOutlined />
                <span>Подробнее</span>
            </div>
            <ItemBlock user={record} afterAction={() => setLoader(true)}/>
            <ItemDelete user={record} afterAction={() => setLoader(true)}/>
        </ModalMenu>
    );
};

export default TeacherModalMenu;