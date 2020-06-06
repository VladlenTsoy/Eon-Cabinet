import React from 'react';
import {CardStatistic} from "../../../../../../lib";
import styled from "styled-components";
import {HomeOutlined} from "@ant-design/icons";

const HomeworkWrapper = styled.div`
  @media (max-width: 576px) {
    margin-right: 1rem;
  }
`;

const Homework = () => {
    return <HomeworkWrapper>
        <CardStatistic
            title="Домашние задания"
            theme="warning"
            icon={<HomeOutlined/>}
            loading={false}
            count={10}
            items={[
                {title: 'Выполенных', count: 0, type: 'warning'},
            ]}
        />
    </HomeworkWrapper>;
};

export default Homework;