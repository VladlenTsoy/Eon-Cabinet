import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Tabs} from "antd";
import {appChangeActionNavbar} from "../../../../../../store/app/actions";
import TableCentersStatistic from "./Table";
import {Navigation} from "../../../../../../layouts/components";
import ExportToExcel from "./ExportToExcel";

const {TabPane} = Tabs;

const CentersStatistic: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appChangeActionNavbar('back'));

        return () => {
            dispatch(appChangeActionNavbar(null));
        };
    }, [dispatch]);


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