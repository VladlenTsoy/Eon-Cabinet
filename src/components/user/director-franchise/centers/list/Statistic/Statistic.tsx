import React from 'react';
import TableCentersStatistic from "./Table";
import {Navigation} from "../../../../../../layouts/components";
import ExportToExcel from "./ExportToExcel";
import {useChangeActionNavbar} from "../../../../../../effects/use-change-action-navbar.effect";

const CentersStatistic: React.FC = () => {
    useChangeActionNavbar({action: 'back'});

    return <>
        <Navigation>
            <ExportToExcel/>
        </Navigation>
        <TableCentersStatistic url={'/director-franchise/centers/statistic'}/>
    </>;
};

export default CentersStatistic;