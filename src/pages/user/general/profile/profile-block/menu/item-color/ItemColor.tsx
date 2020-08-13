import React, {useState} from "react";
import {Modal} from "../../../../../../../lib/components";
import ColorModalBlock from "./color/Color";
import {BgColorsOutlined} from '@ant-design/icons';

interface ItemColorProps {
    currentUser: any;
    changeDataCurrentUser: any;
}

const ItemColor: React.FC<ItemColorProps> = ({currentUser, changeDataCurrentUser}) => {
    const [visible, setVisible] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <div onClick={open}>
            <BgColorsOutlined/>Изменить цвет
        </div>
        <Modal
            title="Настройка цвета"
            centered
            width={300}
            visible={visible}
            onCancel={close}
            okButtonProps={{hidden: true}}
        >
            <ColorModalBlock currentUser={currentUser} changeDataCurrentUser={changeDataCurrentUser}/>
        </Modal>
    </>;
};

export default React.memo(ItemColor);