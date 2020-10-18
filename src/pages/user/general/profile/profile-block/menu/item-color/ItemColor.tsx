import React, {useState} from "react";
import {Modal} from "../../../../../../../lib/ui";
import ColorModalBlock from "./color/Color";
import {BgColorsOutlined} from '@ant-design/icons';

interface ItemColorProps {
    currentUser: any;
}

const ItemColor: React.FC<ItemColorProps> = ({currentUser}) => {
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
            // okButtonProps={{hidden: true}}
        >
            <ColorModalBlock currentUser={currentUser}/>
        </Modal>
    </>;
};

export default React.memo(ItemColor);