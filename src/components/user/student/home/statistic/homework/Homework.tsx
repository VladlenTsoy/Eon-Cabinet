import React from 'react';
import {CardStatistic} from "../../../../../../layouts/components";
import styled from "styled-components";

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
            icon="home"
            loading={false}
            count={10}
            items={[
                {title: 'Выполенных', count: 0, type: 'warning'},
            ]}
        />
    </HomeworkWrapper>;
};

export default Homework;