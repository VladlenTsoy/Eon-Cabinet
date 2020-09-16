import React, {useState} from "react";
import { InfoCircleOutlined } from '@ant-design/icons';
import HelpButton from "../../../../../../lib/modules/help/components/HelpButton"

const HelpItem = () => {
    const [visible, setVisible] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <HelpButton visible={visible} close={close}>
            <div onClick={open}>
                <InfoCircleOutlined /> Помощь
            </div>
        </HelpButton>
    </>;
};

export default HelpItem;