import React from 'react';
import Tab from "lib/ui/data-display/tabs/Tab"
import Tabs from "lib/ui/data-display/tabs/Tabs"
import Futures from "./futures/Futures";
import Currents from "./currents/Currents";
import Pasts from "./pasts/Pasts";
import {HistoryOutlined, ClockCircleOutlined, FlagOutlined} from "@ant-design/icons";
import TabTopExtra from "../tab-top-extra/TabTopExtra"

const Container = () => {
    return <Tabs topExtra={<TabTopExtra/>} defaultValue={'current'}>
        <Tab title={<span><HistoryOutlined/>Прошедшие</span>} key="past">
            <Pasts/>
        </Tab>
        <Tab title={<span><FlagOutlined/>Текушие</span>} key="current">
            <Currents/>
        </Tab>
        <Tab title={<span><ClockCircleOutlined/>Будущие</span>} key="future">
            <Futures/>
        </Tab>
    </Tabs>
};

export default Container;