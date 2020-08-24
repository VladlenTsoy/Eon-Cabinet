import React from 'react';
import {Tabs, TabPane} from "lib/ui";
import {useScreenWindow} from "../../../../../../../hooks/use-screen-window.effect";
import Futures from "./futures/Futures";
import Currents from "./currents/Currents";
import Pasts from "./pasts/Pasts";

const Container = () => {
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    return <Tabs defaultActiveKey={'current'} tabPosition={isBreakpoint ? 'top' : 'left'} style={{minHeight: '200px'}} type="card">
        <TabPane tab="Прошедшие" key="past">
            <Pasts/>
        </TabPane>
        <TabPane tab="Текушие" key="current">
            <Currents/>
        </TabPane>
        <TabPane tab="Будущие" key="future">
            <Futures/>
        </TabPane>
    </Tabs>
};

export default Container;