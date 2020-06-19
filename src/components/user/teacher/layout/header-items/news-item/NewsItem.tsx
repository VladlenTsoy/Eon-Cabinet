import React, {useState} from "react";
import { BulbOutlined } from '@ant-design/icons';
import {Drawer} from "../../../../../../lib";
import News from "../../../../general/news/News";
import {useScreenWindow} from "../../../../../../hooks/use-screen-window.effect";

const NewsItem: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <div onClick={open}>
            <BulbOutlined /> Новости
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