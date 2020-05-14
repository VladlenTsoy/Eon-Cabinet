import React from 'react';
import {Tabs} from "antd";
import TableCentersStatistic from "./Table";
import {Navigation} from "../../../../../../layouts/components";
import ExportToExcel from "./ExportToExcel";
import {useChangeActionNavbar} from "../../../../../../effects/use-change-action-navbar.effect";

const {TabPane} = Tabs;

const CentersStatistic: React.FC = () => {
    useChangeActionNavbar({action: 'back'});

    return <>
        <Navigation>
            <ExportToExcel/>
        </Navigation>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Текущий сайт (Cabinet)" key="1">
                <TableCentersStatistic url={'/director-franchise/centers/statistic'}/>
            </TabPane>
            <TabPane tab="Предыдущий сайт (Old)" key="2">
                <TableCentersStatistic url={'/director-franchise/centers/old/statistic'}/>
            </TabPane>
        </Tabs>
    </>;
};

export default CentersStatistic;