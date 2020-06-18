import React from 'react';
import {CardStatistic} from "../../../../../../lib";
import {HomeOutlined} from "@ant-design/icons";

const Homework = () => {
    return <CardStatistic
            title="Домашние задания"
            theme="primary"
            icon={<HomeOutlined/>}
            loading={false}
            count={10}
            items={[
                {title: 'Выполенных', count: 0, type: 'warning'},
            ]}
        />;
};

export default Homework;