import React, {useState} from "react";
import { QuestionOutlined } from '@ant-design/icons';
import HelpButton from "../../../../../../lib/modules/help/components/HelpButton"

const HelpItem = () => {
    const [visible, setVisible] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <HelpButton visible={visible} close={close}>
            <div onClick={open}>
                <QuestionOutlined /> Помощь
            </div>
        </HelpButton>
    </>;
};

export default HelpItem;