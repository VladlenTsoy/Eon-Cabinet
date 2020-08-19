import React from 'react';
import styled from "styled-components";
import {CardStatistic} from "../../../../../../lib/ui";
import {TrophyOutlined} from "@ant-design/icons";

const OlympiadWrapper = styled.div`
  @media (max-width: 576px) {
    margin-right: 1rem;
  }
`;

interface OlympiadProps {
    olympiad: any;
    loading: boolean;
}

const Olympiad: React.FC<OlympiadProps> = ({olympiad, loading}) => {
    return <OlympiadWrapper>
        <CardStatistic
            title="Олимпиады"
            theme="warning"
            icon={<TrophyOutlined/>}
            loading={loading}
            count={olympiad?.all || 0}
            items={[
                {title: 'Выполенных', count: olympiad?.success || 0, type: 'warning'},
            ]}
        />
    </OlympiadWrapper>
};

export default Olympiad;