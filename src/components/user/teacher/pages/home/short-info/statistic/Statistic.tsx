import React from 'react';
import {CardStatistic} from "../../../../../../../lib";
import {useApiUserGeneral} from "../../../../../../../hooks/use-api-user-general.effect";
import Students from "./students/Students";
import styled from "styled-components";
import {HomeOutlined, TeamOutlined} from "@ant-design/icons";

const StatisticWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const Statistic: React.FC = () => {
    const [loading, statistic] = useApiUserGeneral({url: '/teacher/statistic'});

    return <StatisticWrapper>
        <CardStatistic
            title="Групп"
            icon={<TeamOutlined/>}
            theme="success"
            loading={loading}
            count={statistic ? statistic.groups : 0}/>
        <CardStatistic
            title="Дом. заданий"
            icon={<HomeOutlined/>}
            theme="primary"
            loading={loading}
            count={statistic ? statistic.homework.count : 0}/>
        <Students statistic={statistic} loading={loading}/>
    </StatisticWrapper>;
};

export default Statistic;