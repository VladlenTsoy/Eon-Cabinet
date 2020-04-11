import React, {useState} from "react";
import {Modal} from "../../../../../../../layouts/components";
import ColorModalBlock from "./color/Color";
import { BgColorsOutlined } from '@ant-design/icons';

interface ItemColorProps {
    currentUser: any;
    changeDataCurrentUser: any;
}

const ItemColor: React.FC<ItemColorProps> = ({currentUser, changeDataCurrentUser}) => {
    const [modalColor, setModalColor] = useState(false);
    const openColorModal = () => setModalColor(true);

    return <>
        <div onClick={openColorModal}>
            <BgColorsOutlined />Изменить цвет
        </div>
        <Modal
            title="Настройка цвета"
            centered
            width={300}
            visible={modalColor}
            onCancel={() => setModalColor(false)}
            okButtonProps={{hidden: true}}
        >
            <ColorModalBlock currentUser={currentUser} changeDataCurrentUser={changeDataCurrentUser}/>
        </Modal>
    </>;
};

export default ItemColor;