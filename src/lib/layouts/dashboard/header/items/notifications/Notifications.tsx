import React, {useState} from 'react';
import {Badge, Button} from "antd";
import {BellFilled} from "@ant-design/icons";
import {Drawer} from "../../../../../ui";

const Notifications: React.FC = () => {
    const [visible, setVisible] = useState(false)

    const toggle = () => setVisible(!visible)
    const close = () => setVisible(false)

    return <>
        <Badge count={5}>
            <Button type={visible ? 'primary' : 'default'} shape="circle" onClick={toggle} icon={<BellFilled/>}/>
        </Badge>
        <Drawer
            getContainer="main"
            style={{position: 'absolute'}}
            closable={false}
            mask={false}
            visible={visible}
            onClose={close}
        >
        </Drawer>
    </>
}

export default React.memo(Notifications)