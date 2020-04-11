import React, {useState} from "react";
import { InfoCircleOutlined } from '@ant-design/icons';
import {Drawer} from "../../../../../../layouts/components";
import Help from "../../../../general/help/Help";
import {useScreenWindow} from "../../../../../../effects/use-screen-window.effect";

const HelpItem = () => {
    const [visible, setVisible] = useState(false);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <div onClick={open}>
            <InfoCircleOutlined /> Помощь
        </div>
        <Drawer
            title="Помощь"
            width={isBreakpoint ? '100%' : 520}
            visible={visible}
            onClose={close}
            notFooter={true}
        >
            <Help/>
        </Drawer>
    </>;
};

export default HelpItem;