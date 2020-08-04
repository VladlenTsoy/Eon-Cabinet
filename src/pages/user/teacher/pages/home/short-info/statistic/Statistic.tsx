import React from 'react';
import {CardStatistic} from "../../../../../../../lib/components";
import {useApiUserGeneral} from "../../../../../../../hooks/use-api-user-general.effect";
import Students from "./students/Students";
import styled from "styled-components";
import {HomeOutlined, TeamOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {disciplineSelector} from "../../../../../../../store/access/teacher/discipline/disciplineSlice";

const StatisticWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const Statistic: React.FC = () => {
    const {activeDisciplineId} = useSelector(disciplineSelector);
    const [loading, statistic] = useApiUserGeneral({url: `/teacher/${activeDisciplineId}/statistic`});

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
            items={[{
                title: 'Отправленных',
                type: 'main',
                count: statistic ? statistic.homework.count : 0
            }]}/>
        <Students statistic={statistic} loading={loading}/>
    </StatisticWrapper>;
};

export default Statistic;