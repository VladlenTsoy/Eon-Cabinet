import React, {useState} from "react";
import {BulbOutlined} from '@ant-design/icons';
import {Drawer} from "../../../../../../lib/components";
import News from "../../../../general/news/News";
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect";
import {Badge} from "antd";

const NewsItem: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <div onClick={open}>
            <Badge count={5}><BulbOutlined/></Badge> Новости
        </div>
        <Drawer
            title="Новости"
            width={isBreakpoint ? '100%' : 520}
            visible={visible}
            onClose={close}
            notFooter={true}
        >
            <News/>
        </Drawer>
    </>;
};

export default NewsItem;