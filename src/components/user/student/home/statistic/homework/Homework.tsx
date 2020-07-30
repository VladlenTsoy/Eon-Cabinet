import React from 'react';
import {CardStatistic} from "../../../../../../lib";
import styled from "styled-components";
import {HomeOutlined} from "@ant-design/icons";

const HomeworkWrapper = styled.div`
  @media (max-width: 576px) {
    margin-right: 1rem;
  }
`;

interface HomeworkProps {
    homework: any;
    loading: boolean;
}

const Homework:React.FC<HomeworkProps> = ({loading, homework}) => {
    return <HomeworkWrapper>
        <CardStatistic
            title="Домашние задания"
            theme="primary"
            icon={<HomeOutlined/>}
            loading={loading}
            count={homework?.all || 0}
            items={[
                {title: 'Выполенных', count: homework?.success || 0, type: 'primary'},
            ]}
        />
    </HomeworkWrapper>;
};

export default Homework;