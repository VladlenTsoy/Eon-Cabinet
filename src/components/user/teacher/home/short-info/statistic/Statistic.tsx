import React from 'react';
import {CardStatistic} from "../../../../../../layouts/components";
import {useApiUserGeneral} from "../../../../../../effects/use-api-user-general.effect";
import Students from "./students/Students";
import styled from "styled-components";

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
            icon="team"
            theme="success"
            loading={loading}
            count={statistic ? statistic.groups : 0}/>
        <CardStatistic
            title="Дом. заданий"
            icon="home"
            theme="primary"
            loading={loading}
            count={statistic ? statistic.homework.count : 0}/>
        <Students statistic={statistic} loading={loading}/>
    </StatisticWrapper>;
};

export default Statistic;